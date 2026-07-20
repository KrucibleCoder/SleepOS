export function initCursor() {
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return () => {};
  }

  const cdot = document.getElementById("cdot");
  const cring = document.getElementById("cring");

  // If the cursor elements don't exist, don't do anything.
  if (!cdot || !cring) return;

  let cursorX = 0;
  let cursorY = 0;

  let ringX = 0;
  let ringY = 0;

  const updateCursor = (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  };

  document.addEventListener("mousemove", updateCursor, { passive: true });

  let animationFrame = 0;

  function cursorLoop() {
    ringX += (cursorX - ringX) * 0.14;
    ringY += (cursorY - ringY) * 0.14;

    cdot.style.left = `${cursorX}px`;
    cdot.style.top = `${cursorY}px`;

    cring.style.left = `${ringX}px`;
    cring.style.top = `${ringY}px`;

    animationFrame = requestAnimationFrame(cursorLoop);
  }

  cursorLoop();

  const interactiveElements = document.querySelectorAll("a, button");
  const enter = () => {
    cdot.classList.add("hover");
    cring.classList.add("hover");
  };
  const leave = () => {
    cdot.classList.remove("hover");
    cring.classList.remove("hover");
  };

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", enter);
    element.addEventListener("mouseleave", leave);
  });

  return () => {
    cancelAnimationFrame(animationFrame);
    document.removeEventListener("mousemove", updateCursor);
    interactiveElements.forEach((element) => {
      element.removeEventListener("mouseenter", enter);
      element.removeEventListener("mouseleave", leave);
    });
  };
}
