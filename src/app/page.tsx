import content from "@/content/site-content.json";
import { CapabilityGrid } from "@/components/CapabilityGrid";
import { ConsultationPreview } from "@/components/ConsultationPreview";
import { ConfidenceOutcomes } from "@/components/ConfidenceOutcomes";
import { DecisionSignal } from "@/components/DecisionSignal";
import { EngagementModel } from "@/components/EngagementModel";
import { ResilienceDomains } from "@/components/ResilienceDomains";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">{content.accessibility.skipLink}</a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell hero__grid">
            <div className="hero__content">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="hero-title">{content.hero.headline}</h1>
              <p className="hero__support">{content.hero.support}</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#contact">{content.hero.primaryCta}</a>
                <a className="button button--secondary" href="#approach">{content.hero.secondaryCta}</a>
              </div>
            </div>
            <DecisionSignal />
          </div>
        </section>
        <ConfidenceOutcomes confidence={content.confidence} />
        <section id="perspective" className="thesis" aria-labelledby="thesis-title">
          <div className="shell thesis__grid">
            <p className="eyebrow">{content.thesis.eyebrow}</p>
            <div>
              <h2 id="thesis-title">{content.thesis.title}</h2>
              <p>{content.thesis.body}</p>
            </div>
          </div>
        </section>
        <ResilienceDomains domains={content.domains} />
        <CapabilityGrid capabilities={content.capabilities} />
        <EngagementModel engagement={content.engagement} />
        <ConsultationPreview contact={content.contact} />
      </main>
      <SiteFooter />
    </>
  );
}
