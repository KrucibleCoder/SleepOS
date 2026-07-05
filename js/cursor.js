export function initCursor() {

    const cdot = document.getElementById("cdot");
    const cring = document.getElementById("cring");

    // If the cursor elements don't exist, don't do anything.
    if (!cdot || !cring) return;

    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function cursorLoop() {

        ringX += (cursorX - ringX) * 0.14;
        ringY += (cursorY - ringY) * 0.14;

        cdot.style.left = `${cursorX}px`;
        cdot.style.top = `${cursorY}px`;

        cring.style.left = `${ringX}px`;
        cring.style.top = `${ringY}px`;

        requestAnimationFrame(cursorLoop);
    }

    cursorLoop();

    document
        .querySelectorAll("a, button")
        .forEach((element) => {

            element.addEventListener("mouseenter", () => {
                cdot.classList.add("hover");
                cring.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cdot.classList.remove("hover");
                cring.classList.remove("hover");
            });

        });

}