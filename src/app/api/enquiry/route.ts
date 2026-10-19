import { NextResponse } from "next/server";

/**
 * Institutional enquiry endpoint.
 *
 * Validation and transport are real. Delivery is deliberately NOT faked: if no destination
 * is configured for the deployment, this returns 503 and the form tells the visitor to email
 * PICSS directly, rather than silently swallowing the message.
 *
 * To activate delivery, set PICSS_ENQUIRY_WEBHOOK to an endpoint that accepts a JSON POST
 * (an email relay, a form service, a CRM intake, or an internal handler). See docs/DEPLOYMENT.md.
 */

const MAX = { name: 120, organisation: 160, email: 254, subject: 120, message: 4000 } as const;

interface EnquiryPayload {
  name: string;
  organisation: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must be empty. Not shown to users. */
  website?: string;
}

function validate(body: Partial<EnquiryPayload>): Record<string, string> {
  const errors: Record<string, string> = {};

  const name = body.name?.trim() ?? "";
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > MAX.name) errors.name = "Name is too long.";

  const email = body.email?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > MAX.email) errors.email = "Email address is too long.";

  const subject = body.subject?.trim() ?? "";
  if (subject.length < 1) errors.subject = "Please select an enquiry type.";

  const message = body.message?.trim() ?? "";
  if (message.length < 20) errors.message = "Please provide at least 20 characters so we can route your enquiry.";
  else if (message.length > MAX.message) errors.message = "Message is too long.";

  if ((body.organisation?.trim().length ?? 0) > MAX.organisation) {
    errors.organisation = "Organisation name is too long.";
  }

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Silently accept and drop bot submissions.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const endpoint = process.env.PICSS_ENQUIRY_WEBHOOK;
  if (!endpoint) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Online enquiry delivery is not yet configured for this deployment. Please email info@picss.net directly.",
        code: "NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        receivedAt: new Date().toISOString(),
        name: body.name?.trim(),
        organisation: body.organisation?.trim() || null,
        email: body.email?.trim(),
        subject: body.subject?.trim(),
        message: body.message?.trim(),
      }),
    });

    if (!response.ok) throw new Error(`Upstream responded ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We could not send your enquiry just now. Please email info@picss.net directly.",
        code: "DELIVERY_FAILED",
      },
      { status: 502 },
    );
  }
}
