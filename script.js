'use strict';

// Slider component
const slider = () => {
    // Elements
    const el = {
        slides: document.querySelectorAll('.c-slider__slide'),
        prev: document.querySelector('.c-slider__btn--prev'),
        next: document.querySelector('.c-slider__btn--next'),
        dots: document.querySelector('.c-slider__dots'),
    }

    // Create dots
    const createDots = () => {
      const fragment = new DocumentFragment();
      el.slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'c-slider__dot';
        btn.dataset.index = i;
        fragment.append(btn);
      });
      el.dots.append(fragment);
    };

    // Active index
    let index = 0;

    // Activate slide
    const activateSlide = (index) => {
      el.slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    };

    // Activate dot
    const activateDot = (index) => {
      document.querySelectorAll('.c-slider__dot').forEach(dot => {
        dot.classList.remove('c-slider__dot--active');
      });
      const dot = document.querySelector(`.c-slider__dot[data-index="${index}"]`);
      dot.classList.add('c-slider__dot--active');
    };

    // Activate index
    const activateIndex = (index) => {
      activateSlide(index);
      activateDot(index);
    };

    // Decrease index
    const decreaseIndex = () => {
      if (--index === -1) index = el.slides.length - 1;
      activateIndex(index);
    };

    // Increase index
    const increaseIndex = () => {
      if (++index === el.slides.length) index = 0;
      activateIndex(index);
    };

    // On click dot
    const onClickDot = e => {
      if (!e.target.classList.contains('c-slider__dot')) return;
      index = e.target.dataset.index;
      activateIndex(index);
    };

    // Event listeners
    el.prev.addEventListener('click', decreaseIndex);
    el.next.addEventListener('click', increaseIndex);
    document.addEventListener('keydown', e => {
      e.key === 'ArrowLeft' && decreaseIndex();
      e.key === 'ArrowRight' && increaseIndex();
    });
    el.dots.addEventListener('click', onClickDot);

    // Initialize slider
    const initializeSlider = () => {
      createDots();
      activateIndex(0);
    };
    initializeSlider();
};
slider();
