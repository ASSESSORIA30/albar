import { site } from "@/content/site";

type Section = { h: string; p: string[] };

/** Texto legal con campos de site.ts; los vacíos se marcan como pendientes. */
export function LegalDoc({ title, sections, pendingMark, updatedLabel }: { title: string; sections: Section[]; pendingMark: string; updatedLabel: string }) {
  const values: Record<string, string> = {
    brand: site.brand,
    companyName: site.legal.companyName,
    taxId: site.legal.taxId,
    registeredAddress: site.legal.registeredAddress,
    registry: site.legal.registry,
    privacyEmail: site.legal.privacyEmail,
    dpoContact: site.legal.dpoContact,
    hostingProvider: site.legal.hostingProvider,
    email: site.contact.email,
    phone: site.contact.phone,
  };
  const render = (text: string) =>
    text.split(/(\{\w+\})/g).map((part, i) => {
      const m = part.match(/^\{(\w+)\}$/);
      if (!m) return part;
      const v = values[m[1]];
      return v ? (
        <span key={i}>{v}</span>
      ) : (
        <mark key={i} className="rounded bg-arena/40 px-1 text-antracita">
          [{m[1]}: {pendingMark}]
        </mark>
      );
    });
  return (
    <article className="shell max-w-4xl py-16 md:py-24">
      <h1 className="display text-[2.75rem] sm:text-[4rem]">{title}</h1>
      <p className="mt-4 text-[0.85rem] text-grafito">
        {updatedLabel}:{" "}
        {site.legal.lastUpdated || <mark className="rounded bg-arena/40 px-1 text-antracita">[{pendingMark}]</mark>}
      </p>
      <div className="mt-12 space-y-10">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="heading text-[1.4rem]">{s.h}</h2>
            <div className="mt-3 space-y-3">
              {s.p.map((p, i) => (
                <p key={i} className="prose-serif max-w-[68ch] text-grafito">
                  {render(p)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
