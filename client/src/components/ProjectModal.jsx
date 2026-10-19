import styles from '../page.module.css';

export function ProjectModal({ activeProject, setActiveProject }) {
  return (
    <>
      {activeProject && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveProject(null)}
          aria-hidden="true"
        />
      )}
      <div
        className={`${styles.modal} ${activeProject ? styles.modalOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={activeProject ? `Project: ${activeProject.title}` : 'Project details'}
        aria-hidden={!activeProject}
      >
        {activeProject && (
          <>
            <button
              className={styles.modalClose}
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
              id="modal-close"
            >
              ✕ CLOSE
            </button>
            <div className={styles.modalImageArea}>
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className={styles.modalImg}
              />
            </div>
            <div className={styles.modalContent}>
              <span className={styles.modalCategory}>{activeProject.category}</span>
              <h2 className={styles.modalTitle}>{activeProject.title}</h2>
              <p className={styles.modalDescription}>
                {activeProject.overview}
              </p>
              <div className={styles.modalMeta}>
                <div className={styles.modalMetaItem}>
                  <span className={styles.modalMetaLabel}>COMPLETED</span>
                  <span className={styles.modalMetaValue}>{activeProject.completed}</span>
                </div>
                <div className={styles.modalMetaItem}>
                  <span className={styles.modalMetaLabel}>ROLE</span>
                  <span className={styles.modalMetaValue}>{activeProject.role}</span>
                </div>
                <div className={styles.modalMetaItem}>
                  <span className={styles.modalMetaLabel}>CATEGORY</span>
                  <span className={styles.modalMetaValue}>{activeProject.category}</span>
                </div>
              </div>
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalGithubBtn}
                >
                  VIEW LIVE SITE →
                </a>
              )}
              {activeProject.github && (
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalGithubBtn}
                >
                  VIEW GITHUB REPO →
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
