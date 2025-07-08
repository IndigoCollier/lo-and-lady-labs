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
    readyDate: "February 15, 2025",
    personality: ["Calm", "Affectionate", "Intelligent"],
    vaccinations: "Up to date",
    microchipped: true
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
    readyDate: "February 18, 2025",
    personality: ["Energetic", "Social", "Intelligent"],
    vaccinations: "Up to date",
    microchipped: true
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
    available: true,
    description: "Bella is a stunning apricot beauty with a calm nature.",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "February 22, 2025",
    personality: ["Gentle", "Patient", "Loving"],
    vaccinations: "Up to date",
    microchipped: true
  },
  {
    id: 4,
    name: "Max",
    image: "/images/puppies/puppy-4.jpg",
    age: "11 weeks",
    gender: "Male",
    color: "Chocolate",
    size: "Standard (55-75 lbs)",
    temperament: "Confident & Friendly",
    price: 3000,
    available: false,
    description: "Max is a confident chocolate male with a friendly personality. Already found his forever family!",
    parents: { mother: "Lady - Golden Retriever", father: "Lo - Standard Poodle" },
    healthTesting: ["Hip & Elbow Clearances", "Eye Clearances", "Heart Clearance"],
    readyDate: "February 10, 2025",
    personality: ["Confident", "Outgoing", "Loyal"],
    vaccinations: "Up to date",
    microchipped: true
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
    readyDate: "February 20, 2025",
    personality: ["Smart", "Playful", "Curious"],
    vaccinations: "Up to date",
    microchipped: true
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
    readyDate: "February 25, 2025",
    personality: ["Gentle", "Loyal", "Calm"],
    vaccinations: "Up to date",
    microchipped: true
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