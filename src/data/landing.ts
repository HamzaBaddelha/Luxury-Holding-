// Public asset paths — replace these mockup images with the final assets when ready.
const base = "/images/mockups";
export const images = {
  hero: `${base}/hero-vision-2030.jpg`,
  lux: `${base}/luxury-vehicles.jpg`,
  vlux: `${base}/v-lux-accessories.jpg`,
  bad: `${base}/baddelha-tradein.jpg`,
  swap: `${base}/swap-car.jpg`,
  showroom: `${base}/showroom.jpg`,
  skyline: `${base}/riyadh-skyline.jpg`,
};

export const companies = [
  { id: "01", name: "Luxury Vehicles", tag: "Automotive Retail", desc: "A curated showroom of premium and bespoke vehicles, redefining the driving experience in the Kingdom.", image: images.lux },
  { id: "02", name: "V-LUX Accessories", tag: "Customization", desc: "High-end customization, styling and craftsmanship for the most discerning automotive collectors.", image: images.vlux },
  { id: "03", name: "Baddelha", tag: "Trade-In Service", desc: "Free valuation, expert inspection, fair pricing — selling your car, simplified.", image: images.bad },
  { id: "04", name: "Swap Car", tag: "Mobility", desc: "A seamless car exchange platform designed for the next generation of owners.", image: images.swap },
  { id: "05", name: "Future Mobility", tag: "2030 & Beyond", desc: "Pioneering tomorrow's mobility ecosystem, aligned with Vision 2030.", image: images.showroom },
];

export const stats = [
  { label: "Companies", value: "05" },
  { label: "Headquartered", value: "Riyadh" },
  { label: "Sector", value: "Automotive" },
  { label: "Standard", value: "Premium" },
];

export const testimonials = [
  { name: "Abdulrahman A.", company: "Luxury Vehicles", text: "From first inquiry to delivery, the experience was meticulously curated. A standard rarely seen in the region." },
  { name: "Layla H.", company: "V-LUX", text: "Their craftsmanship transformed my car into a statement piece. Bespoke at every level." },
  { name: "Faisal K.", company: "Baddelha", text: "Honest valuation, transparent process, completed within a single afternoon." },
  { name: "Mohammed Q.", company: "Luxury Vehicles", text: "An effortlessly elegant showroom and a team that truly understands premium service." },
  { name: "Norah S.", company: "Swap Car", text: "The smartest mobility experience I've had in Riyadh — calm, premium, fast." },
  { name: "Khalid R.", company: "Baddelha", text: "No surprises, no pressure. They set a new bar for trade-in in the Kingdom." },
  { name: "Sarah M.", company: "V-LUX", text: "Quiet luxury, executed perfectly. The finish on my interior is flawless." },
  { name: "Yousef T.", company: "Luxury Vehicles", text: "A genuinely Saudi premium brand competing at a global standard." },
];
