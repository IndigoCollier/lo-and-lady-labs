export const teamMembers = [
  {
    id: 1,
    name: "Nelani Collier",
    role: "Co-Founder & Head of Puppy Care",
    age: "23",
    bio:  `Nelani's love for puppies began in childhood and has only grown stronger with time. Known for her giving spirit and natural compassion, she has always been drawn to caring for animals—whether her own pets or strays she'd encounter on the street. Her decision to adopt Mylo wasn't impulsive; it was the culmination of a lifelong dream meeting the perfect opportunity.
           As Mylo's devoted parent, Nelani discovered her true calling in puppy care and welfare. Her meticulous attention to each dog's individual needs and her patient, nurturing approach made the decision to expand their family an easy one. 
           When she welcomed Lady a few years later, their first litter became the foundation of what would grow into Lo and Lady Labs.
           Nelani brings an unmatched level of dedication to every aspect of puppy care, from health monitoring and socialization to preparing each puppy for their forever home. Her natural intuition with animals and commitment to their wellbeing ensures that every family receives not just a pet, but a perfectly prepared companion ready to bring joy for years to come.`,
    quote:"Every puppy deserves a loving home, and every family deserves the unconditional love that only a dog can provide. My job is to make sure those perfect matches happen.",
    image: "/images/team/nelani-collier.jpg",
    specialties: ["Puppy Health & Wellness","Behavioral Training","Family Matching","Post-Adoption Support"],
    credentials: ["Certified Animal Care Specialist", "Puppy Socialization Expert", "First Aid Certified"],
  },
  {
    id: 2, 
    name: "Indigo Collier",
    role: "Co-Founder & Family Integration Specialist",
    age: "24",
    bio: `As a mother of twins and co-founder of Lo and Lady Labs, Indigo brings a unique perspective to puppy adoption that combines professional expertise with deeply personal experience. Her journey into the world of labradoodle breeding and adoption began during one of life's most challenging chapters.
          After giving birth to her twins, Indigo faced the overwhelming challenges of postpartum depression as a single mother. During her darkest moments, Mylo became an unexpected source of comfort and healing. He would instinctively sense her distress, offering silent companionship and unconditional support exactly when she needed it most. This profound experience opened her eyes to the therapeutic power of the human-animal bond.
          When Nelani shared her vision for Lo and Lady Labs, Indigo knew immediately that she wanted to be part of sharing this gift with other families. Her personal understanding of how a labradoodle can provide emotional support, combined with her experience as a parent, makes her uniquely qualified to help families navigate the integration of their new puppy.
          Indigo specializes in matching families with puppies whose temperaments complement their lifestyle, and provides ongoing support to ensure smooth transitions. Her nurturing nature and firsthand knowledge of how dogs can transform lives drives her passion for creating lasting bonds between puppies and their forever families.`,
    quote: "Mylo didn't just become part of our family—he helped heal it. I want every family to experience that same transformative love and support.",
    image: "/images/team/indigo-collier.jpg",
    specialties: [  "Family Lifestyle Assessment", "Puppy-Family Matching","New Parent Support","Emotional Support Animals"],
    credentials: ["Child Development Specialist", "Animal-Assisted Therapy Certified", "Family Counseling Training"],
  },
  
]

export const breedingPhilosophy = {
  mission: "To breed exceptional labradoodles that combine the best qualities of Labradors and Poodles, creating healthy, intelligent, and loving family companions.",
  values: [
    {
      title: "Health First",
      description: "Comprehensive health testing of all breeding dogs ensures genetic health and longevity."
    },
    {
      title: "Temperament Excellence", 
      description: "Careful selection for gentle, stable temperaments suitable for families and therapy work."
    },
    {
      title: "Lifelong Support",
      description: "We're here for you and your puppy throughout their entire life with guidance and support."
    },
    {
      title: "Ethical Practices",
      description: "Transparent, ethical breeding practices with the welfare of our dogs as the top priority."
    }
  ],
  commitment: "Every puppy that leaves our home carries with it our commitment to excellence, health, and the promise of unconditional love. We don't just breed dogs – we create family members."
}

export const getTeamMembers = () => {
  return teamMembers
}

export const getBreedingPhilosophy = () => {
  return breedingPhilosophy
}