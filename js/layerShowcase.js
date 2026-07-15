/* ==========================
   LAYER SHOWCASE MODULE
========================== */
export const initLayerShowcase = () => {
const data = [
{ title:"Premium Fabric", desc:"Soft breathable fabric designed for luxurious comfort.",
  features:["Breathable","Ultra Soft","Cooling Touch"] },
{ title:"Cooling Memory Foam", desc:"Contours to your body and relieves pressure points.",
  features:["Cooling Gel","Pressure Relief","Body Contouring"] },
{ title:"Orthopedic Support", desc:"Provides proper spinal alignment and support.",
  features:["Spinal Alignment","Back Support","Ergonomic Design"] },
{ title:"Pocket Spring System", desc:"Ensures motion isolation and balanced support.",
  features:["Motion Isolation","Balanced Support","Enhanced Comfort"] },
{ title:"High Density Base", desc:"Enhances durability and extends mattress life.",
  features:["High Density","Long Life","Maximum Stability"] }
];
const counters = document.querySelectorAll(".counter-item");
const titleEl = document.getElementById("layerTitle");
const descEl = document.getElementById("layerDescription");
const tagEl = document.getElementById("layerTag");
const featureEls = [
  document.getElementById("feature1"),
  document.getElementById("feature2"),
  document.getElementById("feature3"),
];
let lastIndex = -1;
function updateLayer(index){
    if (index === lastIndex) return;
    lastIndex = index;
    [titleEl, descEl].forEach(el => el.classList.remove("show"));
    setTimeout(() => {
      tagEl.innerText = `LAYER 0${index + 1}`;
      titleEl.innerText = data[index].title;
      descEl.innerText = data[index].desc;
      featureEls.forEach((el, i) => {
        if (el) el.innerText = data[index].features[i];
      });
      counters.forEach((item,i)=> item.classList.toggle("active", i === index));
      [titleEl, descEl].forEach(el => el.classList.add("show"));
    }, 150);
}

/* ==========================
   MAIN TIMELINE — continuous, no idle scroll
   (every phase overlaps slightly with the next,
   so there's never a stretch of scroll with nothing moving)
========================== */

const tl = gsap.timeline({
    scrollTrigger:{
        trigger:".layers-showcase",
        start:"top top",
        end:"bottom bottom",
        scrub:true
    }
});

// preserve CSS centering (translate(-50%,-50%)) since GSAP will
// otherwise overwrite the whole transform when animating y
gsap.set(".layer", { xPercent: -50, yPercent: -50 });

// EXPLODE — staggered, overlapping
tl.to(".memory",{ y:100, opacity:1, duration:0.35 },0)
.to(".support",{ y:220, opacity:1, duration:0.35 },0.12)
.to(".spring",{ y:340, opacity:1, duration:0.35 },0.24)
.to(".base",{ y:460, opacity:1, duration:0.35 },0.36)

// REBUILD — starts before explode fully settles, keeps motion flowing
.to(".fabric",{ y:0, duration:0.4, ease:"power2.inOut" },0.55)
.to(".memory",{ y:0, duration:0.4, ease:"power2.inOut" },0.55)
.to(".support",{ y:0, duration:0.4, ease:"power2.inOut" },0.55)
.to(".spring",{ y:0, duration:0.4, ease:"power2.inOut" },0.55)
.to(".base",{ y:0, duration:0.4, ease:"power2.inOut" },0.55)

// ZOOM + FADE — starts as rebuild finishes settling, punchier scale so it reads clearly
.to(".center-panel",{ scale:1.35, duration:0.4, ease:"power2.out" },0.85)
.to(".left-panel",{ opacity:0, duration:0.3, ease:"power1.out" },0.9)
.to(".right-panel",{ opacity:0, duration:0.3, ease:"power1.out" },0.9);

/* ==========================
   SCROLL CONTENT SYNC
========================== */

ScrollTrigger.create({
    trigger:".layers-showcase",
    start:"top top",
    end:"bottom bottom",
    scrub:true,
    onUpdate:(self)=>{
        let index = Math.min(
            data.length - 1,
            Math.floor(self.progress * data.length)
        );
        updateLayer(index);
    }
});

};