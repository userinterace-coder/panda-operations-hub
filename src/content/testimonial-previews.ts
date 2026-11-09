export type TestimonialPreview = {
  name: string;
  initials: string;
  role: string;
  location: string;
  service: string;
  quote: string;
};

// Design-preview profiles only. Replace every entry with approved client feedback
// before presenting this section as genuine customer testimony.
export const TESTIMONIAL_PREVIEWS: TestimonialPreview[] = [
  {
    name: "Grace Wanjiku",
    initials: "GW",
    role: "Retail business owner",
    location: "Nairobi",
    service: "E-commerce",
    quote: "The team made our online store feel simple to manage, from product updates to customer orders. Every step was explained clearly.",
  },
  {
    name: "Brian Otieno",
    initials: "BO",
    role: "Operations manager",
    location: "Kisumu",
    service: "Business software",
    quote: "Our daily processes finally live in one place. The dashboard gives everyone a clear view of what needs attention.",
  },
  {
    name: "Faith Chebet",
    initials: "FC",
    role: "School administrator",
    location: "Eldoret",
    service: "Training & support",
    quote: "The training was practical and patient. Our staff left knowing exactly how to use the new system with confidence.",
  },
  {
    name: "David Kamau",
    initials: "DK",
    role: "Logistics coordinator",
    location: "Thika",
    service: "Payment integration",
    quote: "Bringing mobile payments and reconciliation together removed hours of repetitive work from our weekly routine.",
  },
  {
    name: "Mary Njeri",
    initials: "MN",
    role: "Hospitality manager",
    location: "Naivasha",
    service: "Web development",
    quote: "Our new website is faster, easier to use and much clearer about what we offer. The design feels truly ours.",
  },
  {
    name: "Kevin Omondi",
    initials: "KO",
    role: "Startup founder",
    location: "Mombasa",
    service: "Product engineering",
    quote: "They turned a rough idea into a focused product plan, then kept every decision visible throughout the build.",
  },
  {
    name: "Esther Atieno",
    initials: "EA",
    role: "Finance officer",
    location: "Nakuru",
    service: "Automation",
    quote: "The automated reports save valuable time and make it much easier to spot entries that need a second look.",
  },
  {
    name: "Peter Mutiso",
    initials: "PM",
    role: "Facilities supervisor",
    location: "Machakos",
    service: "CCTV & infrastructure",
    quote: "The installation was neat, the handover was thorough and our team knows who to call whenever support is needed.",
  },
  {
    name: "Linet Wafula",
    initials: "LW",
    role: "Marketing consultant",
    location: "Bungoma",
    service: "Digital growth",
    quote: "The creative and technical work came together beautifully. We now have a digital presence that feels consistent everywhere.",
  },
  {
    name: "Samuel Kiprop",
    initials: "SK",
    role: "Cooperative director",
    location: "Kericho",
    service: "Cloud & security",
    quote: "We appreciated the direct advice, careful planning and focus on protecting the information our members trust us with.",
  },
];
