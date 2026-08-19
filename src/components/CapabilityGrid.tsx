type Capability = {
  title: string;
  description: string;
};

type CapabilityGridProps = {
  capabilities: {
    title: string;
    items: Capability[];
  };
};

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <section id="capabilities" className="capabilities" aria-labelledby="capabilities-title">
      <div className="shell">
        <div className="section-heading section-heading--capabilities">
          <h2 id="capabilities-title">{capabilities.title}</h2>
        </div>
        <div className="capabilities__grid">
          {capabilities.items.map((capability, index) => (
            <article
              className="capability"
              data-featured={index === 4 ? "true" : undefined}
              key={capability.title}
            >
              <p className="capability__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
