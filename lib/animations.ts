import gsap from 'gsap';

// Animation configuration for performance
const animationConfig = {
  duration: 0.6,
  ease: 'power2.out',
};

/**
 * Slide in animation from top
 */
export const slideInFromTop = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { y: -60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

/**
 * Slide in animation from bottom
 */
export const slideInFromBottom = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

/**
 * Slide in animation from left
 */
export const slideInFromLeft = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { x: -60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

/**
 * Slide in animation from right
 */
export const slideInFromRight = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { x: 60, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

/**
 * Scale pop animation - grows from small to full size
 */
export const popIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: animationConfig.duration,
      ease: 'back.out',
      delay,
    }
  );
};

/**
 * Fade in animation
 */
export const fadeIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      delay,
    }
  );
};

/**
 * Shake animation for wrong guesses
 */
export const shake = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.to(element, {
    x: -10,
    duration: 0.1,
    repeat: 5,
    yoyo: true,
    ease: 'power1.inOut',
  });
};

/**
 * Bounce animation
 */
export const bounce = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out',
      delay,
    }
  );
};

/**
 * Glow effect - pulsing scale and brightness
 */
export const glowPulse = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.to(element, {
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
    scale: 1.05,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Rotate animation
 */
export const spin = (element: HTMLElement | null, duration = 1) => {
  if (!element) return;
  gsap.to(element, {
    rotation: 360,
    duration: duration,
    ease: 'none',
    repeat: -1,
  });
};

/**
 * Counter animation for score/stats
 */
export const countUp = (
  element: HTMLElement | null,
  start: number,
  end: number,
  duration = 1
) => {
  if (!element) return;
  
  const obj = { value: start };
  gsap.to(obj, {
    value: end,
    duration: duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toString();
    },
  });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerIn = (
  elements: HTMLElement[] | NodeListOf<Element> | null,
  animation: 'slideInFromLeft' | 'slideInFromTop' | 'popIn' | 'bounce' = 'slideInFromLeft',
  staggerDelay = 0.1
) => {
  if (!elements) return;
  
  const elementArray = Array.from(elements);
  
  elementArray.forEach((el, index) => {
    const htmlEl = el as HTMLElement;
    switch (animation) {
      case 'slideInFromLeft':
        slideInFromLeft(htmlEl, index * staggerDelay);
        break;
      case 'slideInFromTop':
        slideInFromTop(htmlEl, index * staggerDelay);
        break;
      case 'popIn':
        popIn(htmlEl, index * staggerDelay);
        break;
      case 'bounce':
        bounce(htmlEl, index * staggerDelay);
        break;
    }
  });
};

/**
 * Celebrate animation - confetti-like effect with scale and rotate
 */
export const celebrate = (element: HTMLElement | null) => {
  if (!element) return;
  
  gsap.timeline()
    .to(
      element,
      {
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out',
      },
      0
    )
    .to(
      element,
      {
        rotation: 360,
        duration: 0.6,
        ease: 'none',
      },
      0
    )
    .to(
      element,
      {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in',
      }
    );
};

/**
 * Flip animation for card reveals
 */
export const flip = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { rotationY: -90, opacity: 0 },
    {
      rotationY: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out',
      delay,
    }
  );
};

/**
 * Pulse animation - breathing effect
 */
export const pulse = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.to(element, {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

/**
 * Kill all animations on element
 */
export const killAnimations = (element: HTMLElement | null) => {
  if (!element) return;
  gsap.killTweensOf(element);
};

/**
 * Tilt effect on hover
 */
export const setupTilt = (element: HTMLElement | null) => {
  if (!element) return;
  
  element.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = (e.clientX - rect.left - centerX) / 10;
    const y = (e.clientY - rect.top - centerY) / 10;
    
    gsap.to(element, {
      rotationY: x,
      rotationX: -y,
      transformPerspective: 1000,
      duration: 0.3,
      overwrite: 'auto',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.3,
      overwrite: 'auto',
    });
  });
};

/**
 * Parallax scroll effect
 */
export const setupParallax = (element: HTMLElement | null, speed = 0.5) => {
  if (!element) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    gsap.to(element, {
      y: scrollY * speed,
      duration: 0,
      overwrite: 'auto',
    });
  });
};
