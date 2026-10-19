import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

/**
 * Per-segment animation variants
 */
function getItemVariant(preset, speedSegment) {
  const dur = 0.4 / speedSegment;
  const ease = [0.16, 1, 0.3, 1];

  switch (preset) {
    case 'fade-in-blur':
      return {
        hidden: { opacity: 0, filter: 'blur(10px)', y: 4 },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: { duration: dur, ease },
        },
      };
    case 'blur':
      return {
        hidden: { filter: 'blur(10px)', opacity: 0.6 },
        visible: {
          filter: 'blur(0px)',
          opacity: 1,
          transition: { duration: dur, ease },
        },
      };
    case 'slide':
      return {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: dur, ease },
        },
      };
    case 'fade':
    default:
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: dur, ease },
        },
      };
  }
}

/**
 * TextEffect — Motion Primitives style
 * Fade-in-blur text reveal using motion/react.
 */
export function TextEffect({
  children,
  preset = 'fade-in-blur',
  speedReveal = 1,
  speedSegment = 0.3,
  delay = 0,
  className,
  trigger,
  perWord = true,
}) {
  const containerRef = useRef(null);

  /* Trigger once when 10% of the element is visible */
  const inView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  const shouldAnimate = trigger !== undefined ? trigger : inView;

  /* Split text into segments */
  const segments = perWord ? children.split(' ') : children.split('');

  const itemVariant = getItemVariant(preset, speedSegment);
  const stagger = 0.04 / speedReveal;

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      ref={containerRef}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={containerVariant}
      className={className}
      style={{ display: 'inline' }}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={itemVariant}
          style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
        >
          {perWord && i < segments.length - 1
            ? segment + '\u00a0'
            : segment}
        </motion.span>
      ))}
    </motion.span>
  );
}
