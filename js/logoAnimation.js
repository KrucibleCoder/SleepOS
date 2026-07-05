/* Logo frame animation triggered by hover interactions */

export const initLogoAnimation = () => {
  const logo = document.getElementById("logoAnimation");
  if (!logo) {
    return;
  }

  const frames = Array.from({ length: 96 }, (_, index) => {
    const number = String(index).padStart(3, "0");
    return `assets/logo animation/logo/logo-ani_${number}.png`;
  });

  let currentFrame = 0;
  let animationInterval = null;

  const playFrames = (direction) => {
    clearInterval(animationInterval);
    animationInterval = setInterval(() => {
      const nextFrame = currentFrame + direction;
      if (nextFrame < 0 || nextFrame >= frames.length) {
        clearInterval(animationInterval);
        return;
      }

      currentFrame = nextFrame;
      logo.src = frames[currentFrame];
    }, 20);
  };

  logo.addEventListener("mouseenter", () => {
    playFrames(1);
  });

  logo.addEventListener("mouseleave", () => {
    playFrames(-1);
  });
};
