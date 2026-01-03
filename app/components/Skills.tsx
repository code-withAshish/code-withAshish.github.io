const skills = {
  "Core Engineering": ["System Design", "Distributed Systems", "Concurrency", "Data Structures", "Algorithms"],
  "Languages": ["Go (Golang)", "Rust", "TypeScript", "Python", "SQL"],
  "Infrastructure": ["Kubernetes", "Docker", "AWS", "Terraform", "Prometheus"],
  "Data Store": ["PostgreSQL", "Redis", "Kafka", "Cassandra", "Elasticsearch"]
};

export const Skills = () => {
  return (
    <section className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">03. Toolbelt</h2>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div 
                key={category} 
                className="group p-8 bg-surface/10 border border-border rounded-sm hover:border-accent/30 transition-colors"
              >
                <h3 className="font-mono text-xs uppercase text-muted tracking-widest mb-6 group-hover:text-accent transition-colors">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {items.map(item => (
                    <li key={item} className="text-base md:text-lg text-text/90 hover:text-accent transition-colors cursor-default flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors"></span>
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