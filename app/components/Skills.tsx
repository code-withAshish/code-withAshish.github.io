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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(skills).map(([category, items]) => (
              <div 
                key={category} 
                className="group p-6 bg-surface/10 border border-border rounded-sm hover:border-accent/30 transition-colors"
              >
                <h3 className="font-mono text-xs uppercase text-muted tracking-wider mb-4 group-hover:text-accent transition-colors">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="text-sm text-text/80 hover:text-text transition-colors cursor-default flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent/50 transition-colors"></span>
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