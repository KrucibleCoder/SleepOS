/* Hero section entrance animations and subtle glow effects */

export const initHeroAnimations = () => {
 
  /* ==========================
   HERO CINEMATIC EXPERIENCE
========================== */


const heroTL = gsap.timeline({

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:1

    }

});


heroTL


.to(".hero-video video",{

    scale:1.25,

    filter:"brightness(0.45)",

    ease:"none"

},0)



.to(".hero-title",{

    y:-150,

    opacity:0,

    letterSpacing:"35px",

    ease:"none"

},0)



.to(".hero-subtitle",{

    y:-100,

    opacity:0,

    ease:"none"

},0)



.to(".hero-logo",{

    y:-120,

    opacity:0,

    scale:.8,

    ease:"none"

},0);

/* ==========================
   HERO LOAD REVEAL
========================== */


gsap.from(".hero-title",{

    y:120,

    opacity:0,

    letterSpacing:"50px",

    duration:1.5,

    delay:.5,

    ease:"power4.out"

});


gsap.from(".hero-subtitle",{

    y:60,

    opacity:0,

    duration:1.3,

    delay:.8,

    ease:"power3.out"

});

}