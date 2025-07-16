export const teamMembers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Lead Breeder & Founder",
    bio: "With over 15 years of experience in responsible dog breeding, Sarah founded Lo and Lady Labs with a passion for creating healthy, well-socialized labradoodles. She holds certifications in canine genetics and is committed to advancing the breed through health testing and careful selection.",
    image: "/images/team/sarah-mitchell.jpg",
    specialties: ["Genetic Health Testing", "Puppy Socialization", "Temperament Assessment"],
    credentials: [
      "AKC Breeder of Merit",
      "Certified Canine Genetics Specialist",
      "Member of Goldendoodle Association of North America"
    ]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Veterinary Health Advisor",
    bio: "Dr. Chen provides veterinary oversight for all our breeding programs and puppy health protocols. With 20 years in veterinary medicine specializing in reproductive health and genetics, he ensures the highest standards of care.",
    image: "/images/team/dr-chen.jpg",
    specialties: ["Reproductive Health", "Genetic Counseling", "Puppy Wellness"],
    credentials: [
      "DVM, University of Tennessee",
      "Board Certified Veterinary Specialist",
      "Published researcher in canine genetics"
    ]
  },
  {
    id: 3,
    name: "Emma Johnson",
    role: "Puppy Socialization Specialist",
    bio: "Emma manages our comprehensive puppy socialization program, ensuring each puppy receives individual attention and early life experiences that shape them into confident, well-adjusted companions.",
    image: "/images/team/emma-johnson.jpg",
    specialties: ["Early Socialization", "Behavioral Assessment", "Training Foundations"],
    credentials: [
      "Certified Professional Dog Trainer",
      "Puppy Start Right Instructor",
      "Animal Behavior Specialist"
    ]
  }
]

export const breedingPhilosophy = {
  mission: "To breed exceptional labradoodles that combine the best qualities of Golden Retrievers and Poodles, creating healthy, intelligent, and loving family companions.",
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