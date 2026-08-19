"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import content from "@/content/site-content.json";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeFromOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function closeFromKeyboard(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromKeyboard);

    return () => {
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromKeyboard);
    };
  }, [isOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="shell site-header__inner">
        <a className="brand" href="#main-content" aria-label={content.brand.homeLabel}>
          <Image
            src="/redmind-security-logo.png"
            alt={content.brand.logoAlt}
            width={3126}
            height={816}
            sizes="(max-width: 52rem) 156px, 208px"
          />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? content.navigation.menuCloseLabel : content.navigation.menuOpenLabel}
          onClick={() => setIsOpen((open) => !open)}
          ref={toggleRef}
        >
          <span className="menu-toggle__line" aria-hidden="true" />
          <span className="menu-toggle__line" aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className="primary-navigation"
          aria-label={content.navigation.primaryLabel}
          data-open={isOpen}
        >
          <ul role="list">
            {content.navigation.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
