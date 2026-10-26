export function SectionHead({
  title,
  intro,
  id,
  as: Tag = "h2",
  className = "",
  children,
}: {
  title: string;
  intro?: string;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`grid gap-6 md:grid-cols-12 md:items-end ${className}`}>
      <Tag id={id} className={`display md:col-span-7 ${Tag === "h1" ? "text-[2.75rem] sm:text-[4rem] lg:text-[5.25rem]" : "text-[2.25rem] sm:text-[3rem] lg:text-[3.75rem]"}`}>
        {title}
      </Tag>
      {intro || children ? (
        <div className="md:col-span-5 md:pb-2">
          {intro ? <p className="lead max-w-[34rem]">{intro}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  );
}
