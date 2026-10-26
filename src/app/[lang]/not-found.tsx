import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary, href, routes } from "@/lib/i18n";
import type { Locale } from "@/content/site";

export default async function NotFound() {
  const h = await headers();
  const lang: Locale = h.get("x-locale") === "ca" ? "ca" : "es";
  const d = getDictionary(lang);
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-24">
      <p className="figure text-grafito">404</p>
      <h1 className="display mt-3 text-[3rem] sm:text-[4.5rem]">{d.notFound.title}</h1>
      <p className="lead mt-4 max-w-lg">{d.notFound.text}</p>
      <div className="mt-8 flex flex-col gap-2 xs:flex-row">
        <Link href={href(lang, routes.models)} className="btn btn-secondary">
          {d.common.exploreModels}
        </Link>
        <Link href={href(lang, routes.budget)} className="btn btn-primary">
          {d.common.calculate}
        </Link>
      </div>
    </section>
  );
}
