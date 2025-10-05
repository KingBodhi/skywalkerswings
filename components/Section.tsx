export default function Section({ id, title, subtitle, center, className, children }:{
  id?: string; title?: string; subtitle?: string; center?: boolean; className?: string; children: React.ReactNode
}){
  return (
    <section id={id} className={`py-16 md:py-24 ${className || ""}`}>
      <div className={`mx-auto max-w-6xl px-6 md:px-8 space-y-6 ${center ? "text-center" : ""}`}>
        {title && <h2 className="font-mokoto text-3xl md:text-4xl">{title}</h2>}
        {subtitle && <p className="mx-auto max-w-3xl text-neutral-700 dark:text-neutral-300">{subtitle}</p>}
        <div>{children}</div>
      </div>
    </section>
  );
}