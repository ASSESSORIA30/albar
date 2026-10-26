import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site, type Locale } from "@/content/site";
import type { Dictionary } from "@/content/i18n/es";
import { href, routes } from "@/lib/i18n";
import { CookieSettingsButton } from "./Consent";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const explore = [
    { href: routes.models, label: dict.nav.models },
    { href: routes.budget, label: dict.nav.budget },
    { href: routes.kit, label: dict.nav.kit },
    { href: routes.process, label: dict.nav.process },
    { href: routes.material, label: dict.nav.material },
    { href: routes.contact, label: dict.nav.contact },
  ];
  const { phone, email, address, hours } = site.contact;
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className="relative mt-24 bg-antracita text-cal">
      <div className="coursing absolute inset-x-0 top-0 h-10 opacity-60 invert" aria-hidden="true" />
      <div className="shell grid gap-12 pb-28 pt-20 md:grid-cols-12 md:pb-16">
        <div className="md:col-span-5">
          <Logo inverted />
          <p className="lead mt-6 max-w-sm text-cal/70">{dict.footer.claim}</p>
          {phone || email || address ? (
            <ul className="mt-8 space-y-2 text-[0.95rem] text-cal/85">
              {phone ? (
                <li>
                  <a className="link" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a className="link" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              ) : null}
              {address ? <li>{address}</li> : null}
              {hours ? <li className="text-cal/60">{hours}</li> : null}
            </ul>
          ) : null}
        </div>
        <nav className="md:col-span-3" aria-label={dict.footer.explore}>
          <h2 className="text-[0.85rem] text-cal/50">{dict.footer.explore}</h2>
          <ul className="mt-4 space-y-1">
            {explore.map((l) => (
              <li key={l.href}>
                <Link className="inline-flex min-h-10 items-center text-cal/85 hover:text-cal" href={href(lang, l.href)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="text-[0.85rem] text-cal/50">{dict.footer.company}</h2>
          <ul className="mt-4 space-y-1 text-cal/85">
            <li>
              <Link className="inline-flex min-h-10 items-center hover:text-cal" href={href(lang, routes.legal)}>
                {dict.footer.legal}
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-10 items-center hover:text-cal" href={href(lang, routes.privacy)}>
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-10 items-center hover:text-cal" href={href(lang, routes.cookies)}>
                {dict.footer.cookies}
              </Link>
            </li>
            <li className="flex min-h-10 items-center">
              <CookieSettingsButton label={dict.footer.cookieSettings} />
            </li>
          </ul>
          {socials.length ? (
            <ul className="mt-6 flex flex-wrap gap-4 text-[0.9rem] text-cal/70">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} className="link capitalize" target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 border-t border-cal/15 pt-6 text-[0.8rem] text-cal/50 md:col-span-12 md:flex-row md:justify-between">
          <p>
            © {year} {site.legal.companyName || site.brand}. {dict.footer.rights}
          </p>
          <p>
            {dict.common.taxesNote} {dict.footer.imagesNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
