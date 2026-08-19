import { expect, test } from "@playwright/test";
import content from "../src/content/site-content.json";

test.describe("REDMIND Security single-page experience", () => {
  test("renders the approved semantic hero and supplied logo", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("img", { name: "REDMIND Security" })).toBeVisible();
    await expect(
      page.getByRole("banner").getByRole("link", { name: content.brand.homeLabel })
    ).toHaveAttribute("href", "#main-content");
    await expect(page.getByRole("heading", {
      level: 1,
      name: "Protect the systems you run—and the judgment you rely on."
    })).toBeVisible();
    await expect(page.getByRole("link", { name: "Start a security conversation" })).toHaveAttribute("href", "#contact");
    await expect(page.getByRole("link", { name: "Explore our approach" })).toHaveAttribute("href", "#approach");
  });

  test("collapses navigation to an accessible mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    const navigation = page.getByRole("navigation", { name: "Primary" });
    await expect(toggle).toHaveAttribute("aria-controls", "primary-navigation");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(navigation).toBeHidden();
    await toggle.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await expect(navigation).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(navigation).toBeHidden();
  });

  test("closes the mobile menu after navigation or an outside click", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const openMenu = page.getByRole("button", { name: "Open menu" });
    const navigation = page.getByRole("navigation", { name: "Primary" });
    await openMenu.click();
    await page.getByRole("link", { name: "Approach", exact: true }).click();
    await expect(openMenu).toHaveAttribute("aria-expanded", "false");
    await expect(navigation).toBeHidden();

    await openMenu.click();
    await page.mouse.click(10, 820);
    await expect(openMenu).toHaveAttribute("aria-expanded", "false");
    await expect(navigation).toBeHidden();
  });

  test("connects technical and cognitive resilience without unsupported proof", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Trusted systems are only half the equation." })).toBeVisible();
    await expect(page.getByRole("region", { name: "Confidence outcomes" }).getByRole("article")).toHaveCount(3);
    await expect(page.getByRole("region", { name: "Four resilience domains" }).getByRole("article")).toHaveCount(4);
    const capabilities = page.getByRole("region", { name: "Security capabilities" }).getByRole("article");
    await expect(capabilities).toHaveCount(5);
    await expect(capabilities.nth(4)).toHaveAttribute("data-featured", "true");
    await expect(page.getByRole("heading", { name: "Cognitive Threat Resilience" })).toBeVisible();
    await expect(page.getByText(/our team/i)).toHaveCount(0);
    await expect(page.getByText(/testimonial|certification|trusted by/i)).toHaveCount(0);
  });

  test("keeps rendered copy company-neutral outside the approved approach CTA", async ({ page }) => {
    await page.goto("/");
    const renderedCopy = (await page.locator("body").innerText())
      .replace(content.hero.secondaryCta, "");

    expect(renderedCopy).not.toMatch(/\b(?:we|our|ours|us|team|teams)\b/i);
  });

  test("renders a four-step approach and a non-operational consultation preview", async ({ page }) => {
    const requests: string[] = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") requests.push(request.url());
    });
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Engagement approach" }).getByRole("listitem")).toHaveCount(4);
    await expect(page.getByLabel("Name")).toBeDisabled();
    await expect(page.getByLabel("Work email")).toBeDisabled();
    await expect(page.getByLabel("Security priorities")).toBeDisabled();
    await expect(page.getByRole("button", { name: "Consultation workflow coming soon" })).toBeDisabled();
    await expect(page.getByText(/does not submit or store information/i)).toBeVisible();
    expect(requests).toEqual([]);
  });
});
