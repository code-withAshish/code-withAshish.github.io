

export const About = () => {
  return (
    <section id="philosophy" className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">01. Philosophy</h2>
        </div>
        <div className="md:col-span-9 space-y-8">
          <h3 className="text-2xl font-semibold">Engineering Principles</h3>
          
          <div className="grid gap-8">
            <div className="space-y-3">
              <h4 className="font-medium text-text">Simplicity as a Feature</h4>
              <p className="text-muted leading-relaxed">
                Complex systems are inherently fragile. I prioritize simple, composable solutions that are easier to reason about, test, and maintain over time.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-text">Data Integrity First</h3>
              <p className="text-muted leading-relaxed">
                Applications are transient; data is permanent. I design systems with strict schema validation, immutability where possible, and robust consistency models.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-text">Observable by Default</h3>
              <p className="text-muted leading-relaxed">
                You can't fix what you can't see. I build with comprehensive logging, metrics, and tracing to ensure system health is transparent and debuggable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
