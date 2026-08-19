import Image from "next/image";
import content from "@/content/site-content.json";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <a className="site-footer__brand" href="#main-content" aria-label={content.brand.homeLabel}>
          <Image
            src="/redmind-security-logo.png"
            alt=""
            width={3126}
            height={816}
            sizes="(max-width: 52rem) 156px, 208px"
          />
        </a>
        <p className="site-footer__statement">{content.footer.statement}</p>
        <nav className="site-footer__navigation" aria-label={content.navigation.footerLabel}>
          <ul role="list">
            {content.navigation.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} aria-label={item.footerLabel}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="site-footer__copyright">{content.footer.copyright}</p>
      </div>
    </footer>
  );
}
