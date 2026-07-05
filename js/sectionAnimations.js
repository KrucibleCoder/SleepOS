/* Section entrance and scroll animations for SleepOS */

export const initSectionAnimations = () => {


  gsap.utils.toArray(".panel").forEach((panel) => {
    gsap.from(panel, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: panel,
        start: "top 70%",
      },
    });
  });

  gsap.to(".mattress", {
    scale: 1.15,
    scrollTrigger: {
      trigger: ".story",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

/* ==========================
   IL CAPO STYLE EDITORIAL
========================== */



const editorialTL = gsap.timeline({

    scrollTrigger:{

        trigger:".editorial",

        start:"top top",

        end:"+=2000",

        scrub:1,

        pin:true,

        anticipatePin:1

    }

});


// image opening animation

editorialTL.to(".editorial-img",{


    width:"100vw",

    height:"100vh",

    borderRadius:"0px",


    duration:2,

    ease:"power2.inOut"


})



// text reveal after image open

.to(".editorial-title span",{


    y:0,


    stagger:.15,


    duration:1.5,


    ease:"power4.out"


},"-=0.5")



// description

.to(".editorial-desc",{


    opacity:1,

    y:-20,


    duration:1


},"-=1");

}
