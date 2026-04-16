
const principles = [
  { title: 'Simplicity', detail: 'Composable solutions over clever abstractions.' },
  { title: 'Data Integrity', detail: 'Strict schemas, immutability, and robust consistency.' },
  { title: 'Observability', detail: 'Logging, metrics, tracing — built in from day one.' },
];

export const About = () => {
  return (
    <section id="philosophy" className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">01. Philosophy</h2>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-col divide-y divide-border/50">
            {principles.map(({ title, detail }) => (
              <div key={title} className="flex items-baseline gap-4 py-4">
                <span className="text-sm font-medium text-text shrink-0 w-32">{title}</span>
                <span className="text-sm text-muted">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
