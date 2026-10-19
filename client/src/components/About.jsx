import { TextEffect } from './TextEffect';
import styles from '../page.module.css';

export function About({ handleResumeDownload }) {
  return (
    <section id="about" className={styles.aboutSection} aria-label="About Hardik">
      <div className={styles.aboutInner}>
        {/* ── Title block — top-left ──────────────────── */}
        <div className={styles.aboutTitleBlock}>
          <span className={styles.aboutLabel}>
            <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0}>
              [ ABOUT ]
            </TextEffect>
          </span>
          <h2 className={styles.aboutTitle}>
            <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.1}>
              ABOUT
            </TextEffect>
          </h2>
        </div>

        {/* ── 3-column grid: left text | portrait gap | right text ── */}
        <div className={styles.aboutColumns}>
          {/* Left column — col 1 */}
          <div className={styles.aboutCol}>
            <span className={styles.colIndex}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.25}>
                [ 01 ] PERSPECTIVE — ABOUT ME
              </TextEffect>
            </span>

            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.4}>
                {"I'm Hardik — a Computer Science student who enjoys turning ideas into things people can actually use."}
              </TextEffect>
            </p>
            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.55}>
                {"I'm interested in the space where technology, design, and creativity meet. I like building, experimenting and understanding how digital products work — from the code behind them to the experience people have with them."}
              </TextEffect>
            </p>
            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.7}>
                {"I'm still learning, but I'm always looking for the next thing to build, improve or explore."}
              </TextEffect>
            </p>

            {/* Academic info */}
            <div className={styles.academic}>
              <span className={styles.academicLine}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.85}>
                  Hardik Hirwal
                </TextEffect>
              </span>
              <span className={styles.academicLine}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.9}>
                  JK Lakshmipat University
                </TextEffect>
              </span>
              <span className={styles.academicLine}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.95}>
                  B.Tech / Computer Science &amp; Engineering
                </TextEffect>
              </span>
              <span className={styles.academicLine}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={1.0}>
                  Semester 5
                </TextEffect>
              </span>
            </div>

            {/* Download Resume */}
            <button
              type="button"
              className={styles.resumeBtn}
              onClick={handleResumeDownload}
              id="download-resume"
            >
              DOWNLOAD RESUME →
            </button>
          </div>

          {/* Center spacer — col 2 — portrait shows through */}
          <div aria-hidden="true" />

          {/* Right column — col 3 */}
          <div className={styles.aboutCol}>
            <span className={styles.colIndex}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.3}>
                [ 02 ] CORE MOTIVATION — WHAT DRIVES ME
              </TextEffect>
            </span>

            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.45}>
                {"For me, technology isn't only about writing code."}
              </TextEffect>
            </p>
            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.6}>
                {"I'm drawn to UI/UX, visual design, problem-solving and real-world applications of technology. I enjoy exploring different ideas and bringing them together to create something meaningful."}
              </TextEffect>
            </p>
            <p className={styles.colBody}>
              <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.75}>
                {"Outside the screen, sports and adventure keep me curious, competitive and constantly moving."}
              </TextEffect>
            </p>

            {/* CODE / DESIGN / IMPACT */}
            <div className={styles.aboutIndicators}>
              <span className={styles.indicator}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.9}>
                  CODE
                </TextEffect>
              </span>
              <span className={styles.indicatorDot} />
              <span className={styles.indicator}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={0.95}>
                  DESIGN
                </TextEffect>
              </span>
              <span className={styles.indicatorDot} />
              <span className={styles.indicator}>
                <TextEffect preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3} delay={1.0}>
                  IMPACT
                </TextEffect>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
