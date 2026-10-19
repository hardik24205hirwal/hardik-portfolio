import styles from '../page.module.css';

export function Navbar({ theme, toggleTheme, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <header className={styles.topbar}>
      {/* Logo + Menu trigger */}
      <div className={styles.topLeft}>
        <a
          href="#home"
          className={styles.logoLink}
          aria-label="Hardik Hirwal homepage"
          onClick={e => {
            e.preventDefault();
            scrollTo('#home');
          }}
        >
          <span className={styles.logoBox}>H</span>
          <span className={styles.logoName}>HARDIK</span>
        </a>
        <span className={styles.topDivider} aria-hidden="true">|</span>
        <button
          id="menu-trigger"
          className={styles.menuTrigger}
          onClick={() => setMenuOpen(true)}
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
        >
          <span className={styles.menuDot} aria-hidden="true" />
          <span>MENU</span>
        </button>
      </div>

      {/* Theme pill */}
      <div className={styles.topRight}>
        <button
          id="theme-toggle"
          className={styles.themePill}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
          role="switch"
          aria-checked={theme === 'night'}
        >
          <span className={`${styles.pillLabel} ${theme === 'day' ? styles.pillActive : styles.pillInactive}`}>
            DAY
          </span>
          <span className={`${styles.pillLabel} ${theme === 'night' ? styles.pillActive : styles.pillInactive}`}>
            NIGHT
          </span>
        </button>
      </div>
    </header>
  );
}
