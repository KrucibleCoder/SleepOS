export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1678978866819-306ed8608e7f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBkYXJrJTIwYmVkcm9vbSUyMGJlZHxlbnwwfHx8fDE3ODQwMjM1Njh8MA&ixlib=rb-4.1.0&q=85",
  editorial:
    "https://images.unsplash.com/photo-1699942681763-d1da9f692489?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmVkJTIwd2hpdGUlMjBtYXR0cmVzc3xlbnwwfHx8fDE3ODQwMjM1Njl8MA&ixlib=rb-4.1.0&q=85",
  fabric1:
    "https://images.unsplash.com/photo-1759176170879-6bd7073ab4f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxtYXR0cmVzcyUyMGZhYnJpYyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc4NDAyMzU2OXww&ixlib=rb-4.1.0&q=85",
  fabric2:
    "https://images.unsplash.com/photo-1599163666602-ef737d996c16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxtYXR0cmVzcyUyMGZhYnJpYyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc4NDAyMzU2OXww&ixlib=rb-4.1.0&q=85",
  sleeper:
    "https://images.unsplash.com/photo-1742794565428-1a74fa73f1c9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHw0fHxjYWxtJTIwc2xlZXBpbmclMjBmYWNlJTIwbHV4dXJ5fGVufDB8fHx8MTc4NDAyMzU3NXww&ixlib=rb-4.1.0&q=85",
  layer3:
    "https://images.unsplash.com/photo-1710438399422-2fca27686bcd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYWJzdHJhY3QlMjAzZCUyMHNvZnQlMjB3YXZlfGVufDB8fHx8MTc4NDAyMzU2OXww&ixlib=rb-4.1.0&q=85",
  layer4:
    "https://images.unsplash.com/photo-1599163666602-ef737d996c16?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwzfHxtYXR0cmVzcyUyMGZhYnJpYyUyMHRleHR1cmUlMjBjbG9zZSUyMHVwfGVufDB8fHx8MTc4NDAyMzU2OXww&ixlib=rb-4.1.0&q=85",
  catQueen:
    "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMGJlZCUyMHdoaXRlJTIwc2hlZXR8ZW58MHx8fHwxNzg0MDIzNTc1fDA&ixlib=rb-4.1.0&q=85",
  catLuxury:
    "https://images.unsplash.com/photo-1666813721996-42956e40788e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMGJlZCUyMHdoaXRlJTIwc2hlZXR8ZW58MHx8fHwxNzg0MDIzNTc1fDA&ixlib=rb-4.1.0&q=85",
};

export const LAYER_IMAGES = {
  fabric: "/layers/fabric-layer.png",
  memory: "/layers/memory-layer.png",
  support: "/layers/support-layer.png",
  spring: "/layers/spring-layer.png",
  base: "/layers/base-layer.png",
};

export const LAYERS = [
  {
    n: "01",
    title: "Quilted Cover",
    desc: "A breathable quilted Tencel cover woven from eucalyptus fibre — soft, hypoallergenic, and cool to the touch.",
    img: LAYER_IMAGES.fabric,
  },
  {
    n: "02",
    title: "Cooling Memory Foam",
    desc: "Gel-infused adaptive foam contours to every curve while phase-change channels draw heat away all night.",
    img: LAYER_IMAGES.memory,
  },
  {
    n: "03",
    title: "Orthopedic Support Foam",
    desc: "A high-density transition layer that keeps the spine in true neutral alignment, edge to edge.",
    img: LAYER_IMAGES.support,
  },
  {
    n: "04",
    title: "Pocketed Coil Core",
    desc: "Zoned, individually-wrapped coils absorb motion and deliver responsive, targeted support across the body.",
    img: LAYER_IMAGES.spring,
  },
  {
    n: "05",
    title: "Foundation Base",
    desc: "A reinforced high-resilience base anchors the entire system and guarantees shape for a full decade.",
    img: LAYER_IMAGES.base,
  },
];

export const CATALOGUE = [
  {
    name: "The Queen",
    tag: "Everyday Luxury",
    price: "₹42,000",
    img: IMAGES.catQueen,
  },
  {
    name: "The King",
    tag: "Expansive Rest",
    price: "₹58,000",
    img: IMAGES.hero,
  },
  {
    name: "Orthopedic",
    tag: "Clinical Support",
    price: "₹49,000",
    img: IMAGES.editorial,
  },
  {
    name: "The Luxury",
    tag: "Hotel-Grade",
    price: "₹74,000",
    img: IMAGES.catLuxury,
  },
];

export const MANIFESTO = [
  {
    n: "01",
    title: "Not just a mattress.",
    body: "It is an operating system for rest — engineered layer by layer to reboot your body every single night.",
  },
  {
    n: "02",
    title: "Craft over compromise.",
    body: "Every Shreeram is assembled by hand in limited batches. No shortcuts, no filler foam, no noise.",
  },
  {
    n: "03",
    title: "Sleep as a science.",
    body: "Pressure mapping, thermal regulation and spinal geometry — measured, tuned, and proven in the lab.",
  },
];

export const STATS = [
  { value: "48K+", label: "Happy Sleepers" },
  { value: "4.9", label: "Average Rating" },
  { value: "10", label: "Years Warranty" },
  { value: "100", label: "Nights Trial" },
];
