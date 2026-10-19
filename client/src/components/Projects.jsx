import styles from '../page.module.css';

export function Projects({
  projects,
  carouselIndex,
  snapToIndex,
  goPrev,
  goNext,
  trackRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  setActiveProject,
  hasDragged,
}) {
  return (
    <section id="projects" className={styles.projectsSection} aria-label="Projects">
      {/* Section header */}
      <div className={styles.projectsHeader}>
        <div>
          <span className={styles.sectionLabel}>[ SELECTED WORK ]</span>
          <h2 className={styles.projectsTitle}>PROJECTS</h2>
        </div>
        <div className={styles.carouselControls}>
          <span className={styles.carouselCounter}>
            {String(carouselIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button
            className={styles.carouselBtn}
            onClick={goPrev}
            disabled={carouselIndex === 0}
            aria-label="Previous project"
            id="carousel-prev"
          >
            ←
          </button>
          <button
            className={styles.carouselBtn}
            onClick={goNext}
            disabled={carouselIndex === projects.length - 1}
            aria-label="Next project"
            id="carousel-next"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel viewport — overflow hidden, contains sliding track */}
      <div className={styles.carouselViewport}>
        <div
          className={styles.sliderTrack}
          ref={trackRef}
          role="list"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className={styles.projectCard}
              role="listitem"
              onClick={() => {
                if (!hasDragged.current) setActiveProject(project);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveProject(project);
              }}
              aria-label={`View ${project.title}`}
            >
              {/* ── Upper image area ───────────────────────────── */}
              <div className={styles.cardImage}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.cardImg}
                  draggable={false}
                />
                <div className={styles.cardOverlay} />
              </div>

              {/* ── Lower info area ────────────────────────────── */}
              <div className={styles.cardFooter}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.cardMeta}>
                  <span className={styles.cardMetaItem}>Completed: {project.completed}</span>
                  <span className={styles.cardMetaItem}>Role: {project.role}</span>
                </div>
                <p className={styles.cardOverview}>{project.overview}</p>
                <div className={styles.cardActions}>
                  <span className={styles.cardCTA}>VIEW PROJECT →</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardGithubBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      VIEW LIVE SITE
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardGithubBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      VIEW GITHUB REPO
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className={styles.carouselDots} aria-hidden="true">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`${styles.carouselDot} ${i === carouselIndex ? styles.carouselDotActive : ''}`}
            onClick={() => snapToIndex(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
