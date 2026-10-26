import { scope, type ScopeStatus } from "@/content/scope";
import type { Dictionary } from "@/content/i18n/es";
import type { Locale } from "@/content/site";

const marks: Record<ScopeStatus, React.ReactNode> = {
  included: (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  assembly: (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  excluded: (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  pending: (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="2.2 2" />
    </svg>
  ),
};

const tone: Record<ScopeStatus, string> = {
  included: "bg-antracita text-cal",
  assembly: "bg-piedra text-antracita",
  excluded: "bg-transparent text-antracita border border-linea",
  pending: "bg-paper text-antracita border border-dashed border-piedra-deep",
};

export function KitScope({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const order: ScopeStatus[] = ["included", "assembly", "excluded", "pending"];
  return (
    <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
      {order.map((status) => {
        const items = scope.filter((i) => i.status === status);
        const head = dict.kit.columns[status];
        const dark = status === "included";
        return (
          <section key={status} className={`flex flex-col rounded-[1.25rem] p-5 sm:p-6 ${tone[status]}`} aria-labelledby={`scope-${status}`}>
            <div className="flex items-center gap-2.5">
              <span className={dark ? "text-arena" : "text-grafito"}>{marks[status]}</span>
              <h3 id={`scope-${status}`} className="heading text-[1.3rem]">
                {head.title}
              </h3>
            </div>
            <p className={`mt-2 text-[0.85rem] ${dark ? "text-cal/65" : "text-grafito"}`}>{head.text}</p>
            <ul className={`mt-5 space-y-3 border-t pt-4 ${dark ? "border-cal/15" : "border-linea"}`}>
              {items.map((i) => (
                <li key={i.id}>
                  <p className="text-[0.95rem] leading-snug">{i.label[lang]}</p>
                  {i.note ? <p className={`mt-1 text-[0.8rem] leading-snug ${dark ? "text-cal/60" : "text-grafito"}`}>{i.note[lang]}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
