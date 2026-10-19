import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import styles from '../page.module.css';

/* ── Skills Data ───────────────────────────────────────────── */
const CODING_LANGUAGES = [
  { name: 'Python', percentage: 75 },
  { name: 'C', percentage: 75 },
  { name: 'JavaScript', percentage: 65 },
  { name: 'HTML', percentage: 72 },
  { name: 'CSS', percentage: 70 },
];

const TOOLS_AND_TECHNOLOGIES = [
  { name: 'React', percentage: 65 },
  { name: 'AWS', percentage: 70 },
  { name: 'Google Earth Engine (GEE)', percentage: 72 },
  { name: 'MySQL', percentage: 70 },
  { name: 'Git & GitHub', percentage: 65 },
  { name: 'Framer', percentage: 85 },
  { name: 'MongoDB', percentage: 76 },
];

export function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="skills" ref={sectionRef} className={styles.skillsSection} aria-label="Skills">
      <div className={styles.skillsInner}>
        {/* Section Header */}
        <div className={styles.skillsHeader}>
          <span className={styles.sectionLabel}>[ PROFICIENCIES ]</span>
          <h2 className={styles.skillsTitle}>SKILLS</h2>
        </div>

        {/* 2-Column Grid */}
        <div className={styles.skillsGrid}>
          {/* Column 1: Coding Languages */}
          <motion.div
            className={styles.skillCategoryCard}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryNum}>01</span>
              <h3 className={styles.categoryTitle}>CODING LANGUAGES</h3>
            </div>

            <div className={styles.skillsList}>
              {CODING_LANGUAGES.map((skill, index) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.percentage}%</span>
                  </div>
                  <div className={styles.progressBarTrack} aria-hidden="true">
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: inView ? `${skill.percentage}%` : '0%',
                        transitionDelay: `${index * 80 + 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Tools & Technologies */}
          <motion.div
            className={styles.skillCategoryCard}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryNum}>02</span>
              <h3 className={styles.categoryTitle}>TOOLS &amp; TECHNOLOGIES</h3>
            </div>

            <div className={styles.skillsList}>
              {TOOLS_AND_TECHNOLOGIES.map((skill, index) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillMeta}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillPercent}>{skill.percentage}%</span>
                  </div>
                  <div className={styles.progressBarTrack} aria-hidden="true">
                    <div
                      className={styles.progressBarFill}
                      style={{
                        width: inView ? `${skill.percentage}%` : '0%',
                        transitionDelay: `${index * 60 + 200}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
