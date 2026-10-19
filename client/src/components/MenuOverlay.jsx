import styles from '../page.module.css';

export function MenuOverlay({ menuOpen, setMenuOpen, navItems, scrollTo }) {
  return (
    <>
      <div
        id="editorial-menu-overlay"
        className={`${styles.menuOverlay} ${menuOpen ? styles.menuOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className={styles.menuTopBar}>
          <div className={styles.menuLogoRow}>
            <span className={styles.logoBox}>H</span>
            <span className={styles.menuDirLabel}>NAVIGATION</span>
          </div>
          <button
            id="menu-close"
            className={styles.menuClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <span>✕</span>
            <span>CLOSE</span>
          </button>
        </div>

        <nav className={styles.menuNav} aria-label="Main navigation">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.menuNavLink}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.href);
              }}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={styles.menuNavNum}>0{i + 1}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.menuFooter}>
          <div>
            <span className={styles.menuFooterLabel}>Inquiries</span>
            <a href="mailto:hardik@hirwal.dev" className={styles.menuFooterLink}>
              hardik@hirwal.dev
            </a>
          </div>
          <div>
            <span className={styles.menuFooterLabel}>Location</span>
            <span>Gujarat, India &amp; Worldwide</span>
          </div>
        </div>
      </div>

      {/* Menu backdrop */}
      {menuOpen && (
        <div
          className={styles.menuBackdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
