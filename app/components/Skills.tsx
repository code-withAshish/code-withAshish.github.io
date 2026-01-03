

const skills = {
  "Core": ["System Design", "Distributed Systems", "Data Structures", "Concurrency"],
  "Languages": ["Go", "Rust", "TypeScript", "Python", "SQL"],
  "Infrastructure": ["Kubernetes", "Terraform", "AWS", "Docker", "Prometheus"],
  "Databases": ["PostgreSQL", "Redis", "Cassandra", "Elasticsearch"]
};

export const Skills = () => {
  return (
    <section className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">03. Toolbelt</h2>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h3 className="font-mono text-sm uppercase text-muted tracking-wider border-b border-border pb-2">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="text-sm text-text hover:text-accent transition-colors cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
