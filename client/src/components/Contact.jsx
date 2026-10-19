import styles from '../page.module.css';

export function Contact({
  contactForm,
  setContactForm,
  formStatus,
  formMessage,
  handleContactSubmit,
}) {
  return (
    <section id="contact" className={styles.contactSection} aria-label="Contact">
      <div className={styles.contactInner}>
        <div className={styles.contactTitleBlock}>
          <span className={styles.sectionLabel}>[ GET IN TOUCH ]</span>
          <h2 className={styles.contactTitle}>CONTACT</h2>
          <p className={styles.contactIntro}>
            Have a project idea, collaboration, or just want to say hello? Send a message below.
          </p>
        </div>

        <form className={styles.contactForm} onSubmit={handleContactSubmit} aria-label="Contact form">
          <div className={styles.formGroup}>
            <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Your name"
              className={styles.formInput}
              autoComplete="name"
              value={contactForm.name}
              onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
              disabled={formStatus === 'submitting'}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="your@email.com"
              className={styles.formInput}
              autoComplete="email"
              value={contactForm.email}
              onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
              disabled={formStatus === 'submitting'}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact-message" className={styles.formLabel}>Work / Project Description</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              placeholder="Tell me about your project, idea, objective, timeline, or requirements..."
              className={`${styles.formInput} ${styles.formTextarea}`}
              value={contactForm.message}
              onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
              disabled={formStatus === 'submitting'}
              required
            />
          </div>

          {/* Status message */}
          {formMessage && (
            <p className={`${styles.formStatusMsg} ${formStatus === 'success' ? styles.formSuccess : styles.formError}`}>
              {formMessage}
            </p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            id="contact-submit"
            disabled={formStatus === 'submitting'}
          >
            {formStatus === 'submitting' ? 'SENDING...' : 'SEND MESSAGE →'}
          </button>
        </form>
      </div>
    </section>
  );
}
