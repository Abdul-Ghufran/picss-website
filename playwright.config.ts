import { defineConfig, devices } from "@playwright/test";

/**
 * QA harness for the PICSS site.
 *
 * Runs against a real Chromium so requestAnimationFrame and IntersectionObserver actually
 * fire — the desktop app's browser pane does not run either while it is hidden, which makes
 * scroll-triggered motion unobservable there.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  timeout: 90_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.PICSS_TEST_URL ?? "http://localhost:3001",
    trace: "retain-on-failure",
    viewport: { width: 1440, height: 900 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
