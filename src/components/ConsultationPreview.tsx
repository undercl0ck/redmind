type Contact = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    prioritiesLabel: string;
    buttonLabel: string;
  };
};

type ConsultationPreviewProps = {
  contact: Contact;
};

export function ConsultationPreview({ contact }: ConsultationPreviewProps) {
  return (
    <section id="contact" className="consultation" aria-labelledby="consultation-title">
      <div className="shell consultation__grid">
        <div>
          <p className="eyebrow">{contact.eyebrow}</p>
          <h2 id="consultation-title">{contact.title}</h2>
          <p id="contact-status" className="consultation__status">{contact.description}</p>
        </div>
        <form className="consultation__form" aria-describedby="contact-status" data-status={contact.status}>
          <label>
            {contact.form.nameLabel}
            <input type="text" name="name" disabled />
          </label>
          <label>
            {contact.form.emailLabel}
            <input type="email" name="email" disabled />
          </label>
          <label className="consultation__priorities">
            {contact.form.prioritiesLabel}
            <textarea name="priorities" rows={4} disabled />
          </label>
          <button className="button consultation__button" type="submit" disabled>
            {contact.form.buttonLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
