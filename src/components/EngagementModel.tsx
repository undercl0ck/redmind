type EngagementStep = {
  step: string;
  description: string;
};

type EngagementModelProps = {
  engagement: {
    regionLabel: string;
    eyebrow: string;
    title: string;
    steps: EngagementStep[];
  };
};

export function EngagementModel({ engagement }: EngagementModelProps) {
  return (
    <section id="approach" className="engagement" aria-label={engagement.regionLabel}>
      <div className="shell engagement__grid">
        <div className="section-heading section-heading--engagement">
          <p className="eyebrow">{engagement.eyebrow}</p>
          <h2>{engagement.title}</h2>
        </div>
        <ol className="engagement__list">
          {engagement.steps.map((item, index) => (
            <li className="engagement__item" key={item.step}>
              <p className="engagement__number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3>{item.step}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
