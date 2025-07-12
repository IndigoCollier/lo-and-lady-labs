export const mockPuppies = [
  {
   id: 1,
    name: "Luna",
    image: "/images/puppies/puppy-1.jpg",
    age: "10 weeks",
    gender: "Female",
    color: "Cream",
    size: "Standard (45-65 lbs)",
    temperament: "Gentle & Loving",
    price: 2800,
    available: true,
    description: "Luna is a beautiful cream labradoodle with the sweetest temperament.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 15, 2025",
    personality: ["Gentle", "Loving", "Calm", "Intelligent"],
    vaccinations: "Up to date",
    microchipped: true,
    training: "Basic training started",
    energy: 3,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "available"
  },
  {
    id: 2,
    name: "Cooper",
    image: "/images/puppies/puppy-2.jpg",
    age: "9 weeks",
    gender: "Male",
    color: "Golden",
    size: "Standard (50-70 lbs)",
    temperament: "Playful & Energetic",
    price: 2900,
    available: true,
    description: "Cooper is a gorgeous golden boy with endless energy and love.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 18, 2025",
    personality: ["Playful", "Energetic", "Social", "Intelligent"],
    vaccinations: "Up to date",
    microchipped: true,
    training: "House training in progress",
    energy: 5,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "available"
  },
  {
    id: 3,
    name: "Bella",
    image: "/images/puppies/puppy-3.jpg",
    age: "8 weeks",
    gender: "Female",
    color: "Apricot",
    size: "Medium (30-45 lbs)",
    temperament: "Sweet & Calm",
    price: 2750,
    available: false,
    description: "Bella is a stunning apricot beauty with a calm nature.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 22, 2025",
    personality: ["Sweet", "Patient", "Affectionate"],
    vaccinations: "Up to date",
    microchipped: true,
    training: "Basic training started",
    energy: 2,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "pending"
  },
  {
    id: 4,
    name: "Max",
    image: "/images/puppies/puppy-4.jpg",
    age: "12 weeks",
    gender: "Male",
    color: "Chocolate",
    size: "Large (65-80 lbs)",
    temperament: "Confident & Loyal",
    price: 3000,
    available: false,
    description: "Max found his forever family! This confident chocolate boy is living his best life.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 1, 2025",
    personality: ["Confident", "Loyal", "Protective"],
    vaccinations: "Complete",
    microchipped: true,
    training: "Advanced training completed",
    energy: 4,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "adopted"
  },
  {
    id: 5,
    name: "Daisy",
    image: "/images/puppies/puppy-5.jpg",
    age: "9 weeks",
    gender: "Female",
    color: "Cream",
    size: "Medium (35-50 lbs)",
    temperament: "Playful & Smart",
    price: 2850,
    available: true,
    description: "Daisy is a smart and playful cream girl who loves to learn new tricks.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 20, 2025",
    personality: ["Smart", "Playful", "Curious"],
    vaccinations: "Up to date",
    microchipped: true,
    training: "Basic training started",
    energy: 4,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "pending"
  },
  {
    id: 6,
    name: "Charlie",
    image: "/images/puppies/puppy-6.jpg",
    age: "10 weeks",
    gender: "Male",
    color: "Golden",
    size: "Standard (50-70 lbs)",
    temperament: "Gentle Giant",
    price: 2950,
    available: true,
    description: "Charlie is going to be a big, gentle boy with a heart of gold. Perfect for families who want a larger companion.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "August 25, 2025",
    personality: ["Gentle", "Loyal", "Calm"],
    vaccinations: "Up to date",
    microchipped: true,
    training: "Advanced training completed",
    energy: 4,
    goodWithKids: true,
    goodWithPets: true,
    adoptionStatus: "available"
  }
]

// Helper functions
export const getAvailablePuppies = () => {
  return mockPuppies.filter(puppy => puppy.available)
}

export const getFeaturedPuppies = (count = 3) => {
  return getAvailablePuppies().slice(0, count)
}

export const getPuppyById = (id) => {
  return mockPuppies.find(puppy => puppy.id === parseInt(id))
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}