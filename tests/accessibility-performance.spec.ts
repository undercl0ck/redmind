import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __redmindCls: number;
  }
}

test("has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(
    results.violations.filter(({ impact }) =>
      ["serious", "critical"].includes(impact ?? "")
    )
  ).toEqual([]);
});

test("loads no external runtime resources", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "127.0.0.1") external.push(request.url());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(external).toEqual([]);
});

test("keeps cumulative layout shift below 0.1", async ({ page }) => {
  await page.addInitScript(() => {
    window.__redmindCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!shift.hadRecentInput) window.__redmindCls += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  expect(await page.evaluate(() => window.__redmindCls)).toBeLessThan(0.1);
});

test("keeps the consultation preview non-operational and private", async ({ page }) => {
  const nonGetRequests: string[] = [];
  page.on("request", (request) => {
    if (request.method() !== "GET") nonGetRequests.push(request.url());
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const consultation = page.getByRole("region", { name: "Start a security conversation" });
  const form = consultation.locator("form");

  await expect(form).toHaveAttribute("data-status", "preview");
  await expect(form).not.toHaveAttribute("action", /.+/);
  await expect(form.locator("input, textarea")).toHaveCount(3);
  for (const control of await form.locator("input, textarea").all()) {
    await expect(control).toBeDisabled();
  }
  await expect(
    consultation.getByRole("button", { name: "Consultation workflow coming soon" })
  ).toBeDisabled();
  await expect(
    consultation.getByText(/does not submit or store information/i)
  ).toBeVisible();
  expect(nonGetRequests).toEqual([]);
});
