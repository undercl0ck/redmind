import { expect, test, type Page } from "@playwright/test";

const widths = [320, 360, 390, 430, 480, 600, 768, 900, 1024, 1280, 1440, 1728, 1920];

async function capabilityRows(page: Page) {
  return page.getByRole("region", { name: "Security capabilities" })
    .getByRole("article")
    .evaluateAll((cards) => {
      const rows = new Map<number, number>();

      for (const card of cards) {
        const rowTop = Math.round(card.getBoundingClientRect().top);
        rows.set(rowTop, (rows.get(rowTop) ?? 0) + 1);
      }

      return [...rows.entries()]
        .sort(([firstTop], [secondTop]) => firstTop - secondTop)
        .map(([, count]) => count);
    });
}

for (const width of widths) {
  test(`renders the REDMIND narrative without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    }));

    expect(overflow.scrollWidth).toBe(overflow.clientWidth);
    await page.screenshot({
      path: `tests/visual/home-${width}.png`,
      fullPage: true
    });
  });
}

test("preserves the intended capability hierarchy across responsive states", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  expect(await capabilityRows(page)).toEqual([3, 2]);

  await page.setViewportSize({ width: 900, height: 900 });
  expect(await capabilityRows(page)).toEqual([2, 3]);

  await page.setViewportSize({ width: 600, height: 900 });
  expect(await capabilityRows(page)).toEqual([1, 1, 1, 1, 1]);
});

test("caps the composition at a readable maximum-useful width", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto("/");

  const shellWidth = await page.locator(".hero__grid").evaluate((element) =>
    element.getBoundingClientRect().width
  );

  expect(shellWidth).toBeLessThanOrEqual(1280);
});

test("uses an effectively static signal composition for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const activeDuration = await page.locator(".decision-signal").evaluate((element) =>
    getComputedStyle(element).animationDuration
  );
  expect(activeDuration).not.toBe("0s");

  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedDurations = await page.locator(
    ".decision-signal, .decision-signal__trace--signal, .decision-signal__node"
  ).evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationDuration));

  expect(reducedDurations.length).toBeGreaterThan(2);
  for (const duration of reducedDurations) {
    expect(["0s", "0.001s"]).toContain(duration);
  }
});
