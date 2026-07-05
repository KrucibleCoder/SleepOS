/* ==========================
   LAYER SHOWCASE MODULE
========================== */

export const initLayerShowcase = () => {


/* ==========================
   LAYER DATA
========================== */

const data = [

{
title:"Premium Fabric",
desc:"Soft breathable fabric designed for luxurious comfort.",
features:[
    "Breathable",
    "Ultra Soft",
    "Cooling Touch"
]
},

{
title:"Cooling Memory Foam",
desc:"Contours to your body and relieves pressure points.",
features:[
    "Cooling Gel",
    "Pressure Relief",
    "Body Contouring"
]
},

{
title:"Orthopedic Support",
desc:"Provides proper spinal alignment and support.",
features:[
    "Spinal Alignment",
    "Back Support",
    "Ergonomic Design"
]
},

{
title:"Pocket Spring System",
desc:"Ensures motion isolation and balanced support.",
features:[
    "Motion Isolation",
    "Balanced Support",
    "Enhanced Comfort"
]
},

{
title:"High Density Base",
desc:"Enhances durability and extends mattress life.",
features:[
    "High Density",
    "Long Life",
    "Maximum Stability"
]
}

];



/* ==========================
   COUNTERS
========================== */

const counters =
document.querySelectorAll(".counter-item");



/* ==========================
   UPDATE CONTENT
========================== */

function updateLayer(index){

    document.getElementById("layerTitle")
    .innerText =
    data[index].title;


    document.getElementById("layerDescription")
    .innerText =
    data[index].desc;


    counters.forEach((item,i)=>{

        item.classList.toggle(
            "active",
            i === index
        );

    });

}




/* ==========================
   MAIN TIMELINE
========================== */


const tl = gsap.timeline({

    scrollTrigger:{

        trigger:".layers-showcase",

        start:"top top",

        end:"bottom bottom",

        scrub:true

    }

});




/* ==========================
   EXPLODE LAYERS
========================== */


tl.to(".memory",{

    y:120,

    opacity:1

},0.2)


.to(".support",{

    y:240,

    opacity:1

},0.4)


.to(".spring",{

    y:360,

    opacity:1

},0.6)


.to(".base",{

    y:480,

    opacity:1

},0.8)




/* ==========================
   REBUILD
========================== */


.to(".fabric",{
    y:0
},1)


.to(".memory",{
    y:0
},1)


.to(".support",{
    y:0
},1)


.to(".spring",{
    y:0
},1)


.to(".base",{
    y:0
},1)




/* ==========================
   FINAL ZOOM
========================== */


.to(".center-panel",{

    scale:1.2,

    duration:1

},2)




/* ==========================
   SIDE FADE
========================== */


.to(".left-panel",{

    opacity:0,

    duration:1

},2)


.to(".right-panel",{

    opacity:0,

    duration:1

},2);




/* ==========================
   SCROLL CONTENT SYNC
========================== */

ScrollTrigger.create({

    trigger:".layers-showcase",

    start:"top top",

    end:"bottom bottom",

    scrub:true,


    onUpdate:(self)=>{


        let index =
        Math.min(
            4,
            Math.floor(self.progress * 5)
        );


        updateLayer(index);


    }


});



};