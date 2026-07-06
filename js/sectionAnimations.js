/* Section entrance and scroll animations for SleepOS */

export const initSectionAnimations = () => {

  /* ==========================
     INTRO SECTION ENTRANCE
  ========================== */

  gsap.from(".intro-left", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  gsap.from(".intro-right", {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top 70%",
    },
  });

  /* ==========================
     STORY SECTION (fixed pinning)
  ========================== */

  // pin the image manually via GSAP instead of relying on CSS position:sticky
  // (CSS sticky breaks inside Lenis smooth-scroll wrappers)
  ScrollTrigger.create({
    trigger: ".story",
    start: "top top",
    end: "bottom bottom",
    pin: ".story .sticky",
   
  });

gsap.to(".mattress",{


    scale:1.25,

    y:-80,


    ease:"none",


    scrollTrigger:{


        trigger:".story",


        start:"top top",


        end:"+=1500",


        scrub:true

    }


});

  gsap.utils.toArray(".story .panel").forEach((panel) => {
    gsap.from(panel, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
      },
    });
  });

  /* ==========================
     IL CAPO STYLE EDITORIAL
  ========================== */

const editorialTL =
gsap.timeline({

scrollTrigger:{

trigger:".editorial",

start:"top 5%",

end:"+=3500",

scrub:2,

pin:true,

anticipatePin:1

}

});

  // image opening animation
  editorialTL
    .to(".editorial-img", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      duration: 2,
      ease: "power2.inOut",
    })

    // text reveal after image open
    .to(
      ".editorial-title span",
      {
        y: 0,
        stagger: 0.15,
        duration: 1.5,
        ease: "power4.out",
      },
      "-=0.5"
    )

    // description
    .to(
      ".editorial-desc",
      {
        opacity: 1,
        y: -20,
        duration: 1,
      },
      "-=1"
    );
};