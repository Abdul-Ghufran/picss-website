/**
 * Single source of truth for all PICSS organisational content.
 *
 * EVERY string in this file traces back to `client-reference/about.txt`.
 * Nothing here may be invented. See `docs/CONTENT-STATUS.md` for the register of
 * items still awaiting client verification.
 *
 * `href: null` means "destination not yet confirmed by the client". Components render
 * such actions as clearly-marked, non-navigating controls rather than guessing a URL.
 */

export type Href = string | null;

export interface NavItem {
  label: string;
  href: string;
}

export interface Action {
  label: string;
  href: Href;
  /** Shown as a tooltip / aria description when the destination is unconfirmed. */
  pendingNote?: string;
}

export const organisation = {
  name: "Pakistan Institute for Conflict and Security Studies",
  shortName: "PICSS",
  tagline: "Tracking Conflict. Analysing Security. Informing Policy.",
  summary:
    "Independent research, data and analysis on conflict, militancy, terrorism and security in Pakistan and South Asia.",
  city: "Islamabad, Pakistan",
  phone: "+92 51 8443444",
  phoneHref: "tel:+92518443444",
  email: "info@picss.net",
  emailHref: "mailto:info@picss.net",
  website: "https://picss.net",
} as const;

export const researchDisclaimer =
  "PICSS publications provide research, analysis and information based on available evidence. Individual reports should be read alongside their methodology, source notes and publication dates. Analytical assessments reflect the information available at the time of publication and should not be treated as guarantees of future events.";

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
  { label: "Militancy Database", href: "#database" },
  { label: "Programs", href: "#programs" },
  { label: "Collaboration", href: "#collaboration" },
  { label: "Contact", href: "#contact" },
];

export const heroActions: Action[] = [
  { label: "Explore Our Research", href: "#research" },
  { label: "View Publications", href: "#publications" },
  { label: "Institutional Enquiries", href: "#contact" },
];

/* ------------------------------------------------------------------ 01. About */

export const about = {
  index: "01",
  eyebrow: "About PICSS",
  headline: "Independent Research. Informed Perspectives. Better Understanding.",
  body: [
    "The Pakistan Institute for Conflict and Security Studies (PICSS) is an independent, Islamabad-based, not-for-profit think tank specialising in conflict, terrorism, extremism and security dynamics in Pakistan and the wider South Asian region.",
    "Through field research, conflict monitoring, data analysis and policy-oriented research, PICSS works to develop an evidence-based understanding of evolving security challenges and their regional implications.",
  ],
  audienceLead: "Its research serves",
  audiences: [
    "policymakers",
    "researchers",
    "diplomatic missions",
    "security professionals",
    "media organisations",
    "academic institutions",
  ],
  audienceTail: "and other stakeholders seeking informed perspectives on Pakistan and the region.",
  mission: {
    label: "Our Mission",
    text: "To pioneer data-driven insights and solutions that enhance regional security, counter extremism and foster informed policymaking across South Asia.",
  },
  vision: {
    label: "Our Vision",
    text: "A more secure and peaceful region where data-driven policies and inclusive engagement strengthen communities against extremism.",
  },
} as const;

/* ------------------------------------------- 02. What PICSS does / capabilities */

export interface Capability {
  id: string;
  index: string;
  title: string;
  description: string;
}

export const capabilities = {
  index: "02",
  eyebrow: "What PICSS Does",
  headline: "Researching the challenges shaping regional security.",
  lead: "PICSS brings together research, data and strategic analysis to examine conflict dynamics, security developments and emerging challenges.",
  items: [
    {
      id: "conflict-security-research",
      index: "01",
      title: "Conflict & Security Research",
      description:
        "Examining militant violence, armed groups, counterterrorism responses and evolving security dynamics through research and analytical assessment.",
    },
    {
      id: "data-conflict-monitoring",
      index: "02",
      title: "Data & Conflict Monitoring",
      description:
        "Maintaining structured conflict-related data to support quantitative analysis, geographic assessment and the examination of long-term trends.",
    },
    {
      id: "strategic-policy-assessments",
      index: "03",
      title: "Strategic & Policy Assessments",
      description:
        "Producing research and assessments that place security developments within broader political, strategic and regional contexts.",
    },
    {
      id: "field-research",
      index: "04",
      title: "Field Research & Collaborative Studies",
      description:
        "Conducting and contributing to research projects that deepen understanding of conflict, security and related policy challenges.",
    },
    {
      id: "youth-engagement",
      index: "05",
      title: "Youth Engagement & Social Inclusion",
      description:
        "Supporting constructive engagement and discussion through initiatives such as Pakistaniat, which promotes tolerance, social inclusion and national cohesion.",
    },
  ] satisfies Capability[],
} as const;

/* ------------------------------------------------ 03. Research & publications */

export interface Publication {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Verified cover artwork supplied by the client, or null where none was supplied. */
  cover: string | null;
  coverAlt: string;
  /** Publication date — only present where the supplied material states one. */
  date: string | null;
  attribution: string | null;
  href: Href;
}

export const publications = {
  index: "03",
  eyebrow: "Research & Publications",
  headline: "Evidence that contributes to the security discourse.",
  lead: [
    "PICSS produces research reports, security assessments, analytical articles, books and specialised publications examining developments in Pakistan and South Asia.",
    "Its publications cover militant activity, counterterrorism, regional affairs, strategic developments, governance challenges and other issues relevant to conflict and security.",
  ],
  featuredLabel: "Featured Research",
  items: [
    {
      id: "national-security-profile-2025",
      title: "Pakistan’s Comprehensive National Security Profile 2025",
      category: "Annual Assessment",
      description:
        "An annual assessment examining Pakistan’s internal security environment, militant violence, state responses and broader security trends.",
      cover: "/assets/pub-security-profile-2025.jpeg",
      coverAlt:
        "Cover of Pakistan’s Comprehensive National Security Profile 2025, subtitled Security Stress, Strategic Gains: Trends, Trade-offs and Trajectories.",
      date: "2025",
      attribution: "Annual Report · Islamabad",
      href: null,
    },
    {
      id: "picss-rddc-afghanistan",
      title: "PICSS–RDDC Research on Afghanistan",
      category: "Collaborative Research",
      description:
        "Collaborative research examining post-August 2021 Afghanistan and its security dynamics, including field-research-based work published with the Royal Danish Defence College.",
      cover: "/assets/pub-afghanistan-taliban.jpeg",
      coverAlt:
        "Cover of Post-August 2021: Taliban Governance, Security Dynamics and the Road to Stability in Afghanistan, by Gul Dad, Abdullah Khan and Jens V. Mathiesen.",
      date: null,
      attribution: "With the Royal Danish Defence College",
      href: null,
    },
    {
      id: "security-strategic-assessments",
      title: "Security & Strategic Assessments",
      category: "Periodic Series",
      description:
        "Weekly, monthly, annual and specialised publications examining emerging developments, trends and their wider implications.",
      cover: "/assets/pub-byc.jpeg",
      coverAlt:
        "Cover of a PICSS strategy paper titled Baloch Yakjehti Committee (BYC): Structure, Influence, and State Response — A Comprehensive Profile.",
      date: null,
      attribution: "Strategy Paper series",
      href: null,
    },
    {
      id: "research-articles",
      title: "Research Articles & Policy Analysis",
      category: "Analysis",
      description:
        "Analytical contributions addressing conflict, militancy, foreign policy, defence, regional affairs and strategic developments.",
      cover: "/assets/pub-madrasas.jpeg",
      coverAlt:
        "Cover of The Role of Madrasas: Assessing Parental Choice, Financial Pipelines and Recent Developments in Religious Education in Pakistan & Afghanistan, edited by David Vestenskov.",
      date: null,
      attribution: "Published with Danish Defence",
      href: null,
    },
  ] satisfies Publication[],
  actions: [
    { label: "Explore Publications", href: null, pendingNote: "Publications index URL to be confirmed by PICSS." },
    { label: "Browse Research & Analysis", href: null, pendingNote: "Research archive URL to be confirmed by PICSS." },
  ] satisfies Action[],
} as const;

/* ---------------------------------------------------- 04. Militancy Database */

export const database = {
  index: "04",
  eyebrow: "PICSS Militancy Database",
  headline: "Structured data for understanding conflict.",
  lead: [
    "The PICSS Militancy Database provides structured, regularly updated information on militant attacks, security-force actions, casualties and geographic patterns.",
    "It supports the examination of incident trends, regional differences and changes in the security environment over time.",
  ],
  applicationsLabel: "Research applications include",
  applications: [
    "Quantitative analysis of militant violence.",
    "Geographic and district-level assessment.",
    "Examination of casualties and security-force actions.",
    "Long-term trend analysis.",
    "Research supporting security assessments and policy discussions.",
  ],
  closing:
    "The database is a research resource intended to support a more systematic understanding of conflict and militancy.",
  action: {
    label: "Explore the PICSS Militancy Database",
    href: null,
    pendingNote: "Database destination to be confirmed by PICSS.",
  } satisfies Action,
} as const;

/* ------------------------------------------------- 05. Programs & initiatives */

export interface Initiative {
  id: string;
  title: string;
  description: string;
  meta: string | null;
}

export const programs = {
  index: "05",
  eyebrow: "Programs & Initiatives",
  headline: "Creating space for research, dialogue and engagement.",
  lead: "PICSS undertakes research and engagement activities that connect analysis with wider discussions on security, society and policy.",
  items: [
    {
      id: "pakistaniat",
      title: "Pakistaniat",
      description:
        "An initiative launched in 2018 to promote tolerance, social inclusion, national cohesion and constructive youth engagement through dialogues, conferences and related activities.",
      meta: "Launched 2018",
    },
    {
      id: "research-partnerships",
      title: "Research Partnerships",
      description:
        "PICSS has undertaken collaborative initiatives with Pakistani and international academic, government and research institutions. Its documented institutional engagement includes NACTA, the Royal Danish Defence College, Fatima Jinnah Women University, Foundation University and the University of Sargodha.",
      meta: "Documented institutional engagement",
    },
    {
      id: "conferences",
      title: "Conferences & Policy Dialogue",
      description:
        "PICSS uses public discussions, conferences, expert engagement and related activities to encourage informed discussion of security and strategic issues.",
      meta: null,
    },
    {
      id: "research-collaboration",
      title: "Research Collaboration",
      description:
        "The institute welcomes engagement around rigorous research, data-led analysis, policy dialogue, academic collaboration and projects that advance understanding of conflict and security in Pakistan and South Asia.",
      meta: null,
    },
  ] satisfies Initiative[],
  partners: [
    "NACTA",
    "Royal Danish Defence College",
    "Fatima Jinnah Women University",
    "Foundation University",
    "University of Sargodha",
  ],
  actions: [
    { label: "Explore Programs", href: null, pendingNote: "Programs page URL to be confirmed by PICSS." },
    { label: "Discuss a Research Partnership", href: "#contact" },
  ] satisfies Action[],
} as const;

/* ------------------------------------------ 06. Internship & early career */

export const internship = {
  index: "06",
  eyebrow: "Internship & Early-Career Engagement",
  headline: "Building pathways into research and policy analysis.",
  lead: "PICSS’s work spans research, data analysis, writing and security assessment. A dedicated internship portfolio section could explain how eligible students and early-career professionals may engage with these areas.",
  proposedLabel: "The proposed section can feature",
  proposed: [
    "An overview of available internship opportunities.",
    "Eligibility requirements and application procedures.",
    "Areas of learning and professional development.",
    "Research projects or outputs completed by interns, where approved.",
    "Experiences and testimonials from past participants, where available.",
  ],
  notice: {
    label: "Application information",
    text: "Specific internship availability, eligibility, duration, selection criteria and application deadlines must be confirmed by PICSS before publication. This page does not imply that a particular internship intake is currently open.",
  },
  action: {
    label: "Internship Information",
    href: null,
    pendingNote: "Publish once verified by PICSS.",
  } satisfies Action,
} as const;

/* ------------------------------------- 07. Institutional impact & recognition */

export interface ImpactRecord {
  id: string;
  title: string;
  description: string;
}

export const impact = {
  index: "07",
  eyebrow: "Institutional Impact & Recognition",
  headline: "Research that contributes to policy, scholarship and public discourse.",
  lead: [
    "The relevance of research can be understood through its use, citation and engagement by other institutions, researchers and public audiences.",
    "PICSS maintains an institutional impact and recognition section documenting references to its research and data in policy, academic and media contexts.",
  ],
  items: [
    {
      id: "academic",
      title: "Academic & Research References",
      description: "Studies, books and scholarly publications that cite or draw upon PICSS research.",
    },
    {
      id: "policy",
      title: "Policy & Institutional References",
      description:
        "Reports and assessments by public institutions and other organisations that reference PICSS data or publications.",
    },
    {
      id: "media",
      title: "Media Engagement",
      description:
        "Documented instances in which PICSS research, assessments or expertise contribute to media coverage and public discussion.",
    },
    {
      id: "milestones",
      title: "Research Milestones",
      description:
        "Selected institutional developments, completed research projects, publications and collaborative initiatives.",
    },
  ] satisfies ImpactRecord[],
  evidenceNote:
    "Each featured item should identify the relevant publication or institution, date, context and original source wherever possible. Any quantitative impact indicators should be supported by verifiable records.",
  action: { label: "Explore Impact & Recognition", href: null, pendingNote: "Awaiting verified records from PICSS." } satisfies Action,
} as const;

/* -------------------------------------------------------- 08. Our journey */

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export const timeline = {
  index: "08",
  eyebrow: "Our Journey",
  headline: "Developing research capacity over time.",
  lead: "PICSS’s institutional development reflects an expanding focus on conflict monitoring, security research, data analysis and engagement.",
  items: [
    {
      id: "2014",
      year: "2014",
      title: "Institutional Launch",
      description: "PICSS was formally launched in Islamabad.",
    },
    {
      id: "2015",
      year: "2015",
      title: "Militancy Database",
      description: "The PICSS Militancy Database was formally launched.",
    },
    {
      id: "2016-2017",
      year: "2016–2017",
      title: "Research Expansion",
      description:
        "Research expanded into policy monitoring and major field studies, including work with NACTA and the Royal Danish Defence College.",
    },
    {
      id: "2018",
      year: "2018",
      title: "Pakistaniat Initiative",
      description: "PICSS launched Pakistaniat to promote social inclusion and youth engagement.",
    },
    {
      id: "2021",
      year: "2021 Onward",
      title: "Regional Monitoring",
      description: "Conflict monitoring expanded to the wider South Asian region.",
    },
    {
      id: "2024",
      year: "2024",
      title: "Collaborative Research on Afghanistan",
      description:
        "PICSS and the Royal Danish Defence College’s Centre for Stabilisation published field-research-based work on post-August 2021 Afghanistan.",
    },
  ] satisfies Milestone[],
} as const;

/* ------------------------------------------- 09. Institutional collaboration */

export const collaboration = {
  index: "09",
  eyebrow: "Institutional Collaboration",
  headline: "Advancing shared understanding through research.",
  lead: "PICSS engages with academic institutions, research organisations, government bodies and other stakeholders on projects relevant to conflict and security.",
  areasLabel: "Potential areas for collaboration include",
  areas: [
    "Joint research and publications.",
    "Security and policy assessments.",
    "Data-led research projects.",
    "Academic engagement and expert discussions.",
    "Conferences, seminars and roundtables.",
    "Regional security and strategic studies.",
  ],
  closing:
    "PICSS welcomes institutional enquiries concerning research partnerships, collaboration and opportunities for informed dialogue.",
  conversationLabel: "Start a Conversation",
  action: { label: "Discuss Institutional Collaboration", href: "#contact" } satisfies Action,
} as const;

/* ------------------------------------------------------------- 10. Contact */

export const contact = {
  index: "10",
  eyebrow: "Contact PICSS",
  headline: "Connect with our research and institutional team.",
  lead: "For research enquiries, institutional collaboration, media engagement and general information, contact the Pakistan Institute for Conflict and Security Studies.",
  enquiryTypes: [
    "Research enquiry",
    "Institutional collaboration",
    "Media engagement",
    "General information",
  ],
} as const;

export const footerColumns = [
  {
    title: "Institute",
    links: [
      { label: "About", href: "#about" },
      { label: "Our Journey", href: "#timeline" },
      { label: "Institutional Impact", href: "#impact" },
      { label: "Contact", href: "#contact" },
    ] satisfies NavItem[],
  },
  {
    title: "Research",
    links: [
      { label: "What PICSS Does", href: "#research" },
      { label: "Publications", href: "#publications" },
      { label: "Militancy Database", href: "#database" },
    ] satisfies NavItem[],
  },
  {
    title: "Engagement",
    links: [
      { label: "Programs & Initiatives", href: "#programs" },
      { label: "Internship", href: "#internship" },
      { label: "Collaboration", href: "#collaboration" },
    ] satisfies NavItem[],
  },
];
