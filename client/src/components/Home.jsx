import styles from '../page.module.css';

export function Home() {
  return (
    <section id="home" className={styles.homeSection} aria-label="Home">
      {/* Upper-right independent interest text — fixed to Home page layer */}
      <div className={styles.homeIdentity} aria-label="Interests">
        <span>CODER —</span>
        <span>UI/UX ENTHUSIAST —</span>
        <span>SPORTS ENTHUSIAST —</span>
      </div>

      {/* Bottom-left meta + HARDIK nameplate */}
      <div className={styles.heroContent}>
        <div className={styles.heroMeta}>
          <span className={styles.metaRow}>
            <span className={`${styles.statusDot} status-dot`} />
            <span className={styles.metaText}>AVAILABLE FOR 2025 PROJECTS</span>
          </span>
          <span className={styles.metaDivider} aria-hidden="true">/</span>
          <span className={styles.metaCoord}>23.02° N, 72.57° E — IN</span>
        </div>

        <p className={styles.archiveLabel}>— PERSONAL ARCHIVE / PORTFOLIO</p>

        <h1 className={`huge-name ${styles.heroName}`}>
          <span className="ha-text">HA</span>
          <span className="rdik-text">RDIK</span>
        </h1>
      </div>

      {/* Right pillars 01/02/03 */}
      <aside className={styles.pillars} aria-label="Disciplinary areas">
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>01</span>
          <span className={styles.pillarLabel}>CODE</span>
        </div>
        <div className={styles.pillarLine} aria-hidden="true" />
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>02</span>
          <span className={styles.pillarLabel}>DESIGN</span>
        </div>
        <div className={styles.pillarLine} aria-hidden="true" />
        <div className={styles.pillar}>
          <span className={styles.pillarNum}>03</span>
          <span className={styles.pillarLabel}>IMPACT</span>
        </div>
      </aside>
    </section>
  );
}
