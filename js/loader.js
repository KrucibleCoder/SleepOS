/* ==========================
   CINEMATIC LOADER
========================== */

export const initLoader = () => {


const loaderTL = gsap.timeline();


loaderTL


.from(".loader-text",{

    scale:0.2,

    opacity:0,

    duration:1.5,

    ease:"power4.out"

})


.from(".loader-subtext",{

    y:40,

    opacity:0,

    duration:1,

    ease:"power3.out"

},"-=0.8")


.to(".loader-text",{

    scale:1.1,

    duration:1

})


.to(".loader-subtext",{

    opacity:0,

    y:-40,

    filter:"blur(10px)",

    duration:0.8

})


.to(".loader-text",{

    scale:15,

    color:"transparent",

    duration:1,

    ease:"power3.inOut"

})


.to(".loader",{

    opacity:0,

    duration:0.5

},"-=0.4")


.to(".hero",{

    opacity:1,

    duration:0.8

},"-=0.5")


.set(".loader",{

    display:"none"

});


};