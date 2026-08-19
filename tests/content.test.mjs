import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const contentPath = new URL("../src/content/site-content.json", import.meta.url);

test("publishes the approved resilience and capability model", async () => {
  const content = JSON.parse(await readFile(contentPath, "utf8"));
  assert.equal(content.brand.name, "REDMIND Security");
  assert.equal(content.hero.headline, "Protect the systems you run—and the judgment you rely on.");
  assert.equal(content.domains.items.length, 4);
  assert.equal(content.capabilities.items.length, 5);
  assert.equal(content.engagement.steps.length, 4);
  assert.match(content.capabilities.items[4].description, /disinformation|influence operations|cognitive warfare/i);
});

test("publishes every public interface string through the content contract", async () => {
  const content = JSON.parse(await readFile(contentPath, "utf8"));

  assert.deepEqual(content.metadata, {
    title: "REDMIND Security | Cybersecurity and Cognitive Resilience",
    description: "Practical cybersecurity and cognitive-resilience guidance for regulated organizations protecting systems, information, people, and judgment."
  });
  assert.deepEqual(content.brand, {
    name: "REDMIND Security",
    homeLabel: "REDMIND Security home",
    logoAlt: "REDMIND Security"
  });
  assert.equal(content.accessibility.skipLink, "Skip to content");
  assert.deepEqual(content.navigation, {
    primaryLabel: "Primary",
    footerLabel: "Footer",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    items: [
      { label: "Perspective", href: "#perspective", footerLabel: "Perspective section" },
      { label: "Domains", href: "#domains", footerLabel: "Domains section" },
      { label: "Capabilities", href: "#capabilities", footerLabel: "Capabilities section" },
      { label: "Approach", href: "#approach", footerLabel: "Approach section" },
      { label: "Contact", href: "#contact", footerLabel: "Contact section" }
    ]
  });
  assert.equal(content.confidence.regionLabel, "Confidence outcomes");
  assert.equal(content.thesis.eyebrow, "A security point of view");
  assert.equal(content.domains.title, "Four resilience domains");
  assert.equal(content.capabilities.title, "Security capabilities");
  assert.equal(content.engagement.regionLabel, "Engagement approach");
  assert.equal(content.engagement.eyebrow, "REDMIND approach");
  assert.equal(content.engagement.title, "A clearer path from concern to action.");
  assert.deepEqual(content.contact.form, {
    nameLabel: "Name",
    emailLabel: "Work email",
    prioritiesLabel: "Security priorities",
    buttonLabel: "Consultation workflow coming soon"
  });
  assert.deepEqual(content.footer, {
    statement: "Cybersecurity and cognitive resilience for trusted decisions.",
    copyright: "© 2026 REDMIND Security"
  });
});

test("does not publish deferred or unsupported proof", async () => {
  const content = JSON.parse(await readFile(contentPath, "utf8"));
  const serialized = JSON.stringify(content).replace(content.hero.secondaryCta, "");
  assert.doesNotMatch(serialized, /\b(?:we|our|ours|us|team|teams)\b/i);
  assert.doesNotMatch(serialized, /certified professionals/i);
  assert.equal(Object.hasOwn(content, "testimonials"), false);
  assert.equal(Object.hasOwn(content, "clientLogos"), false);
  assert.equal(Object.hasOwn(content, "statistics"), false);
});
