export function LogoStrip() {
  return (
    <section className="w-full bg-surface-alt py-10 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-text-muted-light uppercase tracking-wider mb-6">
          Trusted by educators worldwide
        </p>
        <div className="flex justify-center md:justify-between items-center gap-8 md:gap-12 overflow-x-auto pb-4 hide-scrollbar">
          {["Stanford", "MIT", "Harvard", "Oxford", "Cambridge"].map((name) => (
            <div key={name} className="text-xl md:text-2xl font-bold text-text-muted-light/40 whitespace-nowrap">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
