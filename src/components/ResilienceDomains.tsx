type Domain = {
  name: string;
  description: string;
};

type ResilienceDomainsProps = {
  domains: {
    title: string;
    items: Domain[];
  };
};

export function ResilienceDomains({ domains }: ResilienceDomainsProps) {
  return (
    <section id="domains" className="domains" aria-labelledby="domains-title">
      <div className="shell">
        <div className="section-heading">
          <h2 id="domains-title">{domains.title}</h2>
        </div>
        <div className="domains__grid">
          {domains.items.map((domain, index) => (
            <article className="domain" key={domain.name}>
              <p className="domain__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3>{domain.name}</h3>
              <p>{domain.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
