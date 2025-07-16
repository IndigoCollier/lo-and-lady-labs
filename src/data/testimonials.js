export const testimonials = [
  {
    id: 1,
    customerName: "Sarah & Mike Johnson",
    location: "Nashville, TN",
    puppyName: "Charlie",
    puppyBreed: "F1 Standard Labradoodle",
    adoptionDate: "March 2024",
    rating: 5,
    testimonial: "Charlie has been the perfect addition to our family! From day one, his gentle temperament with our children has been amazing. The team at Lo and Lady Labs was incredibly supportive throughout the entire process.",
    image: "/images/testimonials/johnson-family.jpg",
    puppyImage: "/images/testimonials/charlie-now.jpg",
    featured: true
  },
  {
    id: 2,
    customerName: "Jennifer Martinez",
    location: "Birmingham, AL",
    puppyName: "Luna",
    puppyBreed: "F1B Medium Labradoodle",
    adoptionDate: "January 2024",
    rating: 5,
    testimonial: "As a first-time dog owner, I was nervous about the whole process. The breeder took time to match me with Luna based on my lifestyle. She's been the most loving companion, and her hypoallergenic coat is perfect for my allergies!",
    image: "/images/testimonials/martinez-family.jpg",
    puppyImage: "/images/testimonials/luna-now.jpg",
    featured: true
  },
  {
    id: 3,
    customerName: "The Thompson Family",
    location: "Atlanta, GA",
    puppyName: "Buddy",
    puppyBreed: "F2 Standard Labradoodle",
    adoptionDate: "December 2023",
    rating: 5,
    testimonial: "Buddy has exceeded all our expectations. His intelligence and eagerness to learn made training a joy. The health testing and transparency from Lo and Lady Labs gave us complete confidence in our choice.",
    image: "/images/testimonials/thompson-family.jpg",
    puppyImage: "/images/testimonials/buddy-now.jpg",
    featured: true
  },
  {
    id: 4,
    customerName: "Robert & Linda Chen",
    location: "Little Rock, AR",
    puppyName: "Daisy",
    puppyBreed: "F1 Medium Labradoodle",
    adoptionDate: "November 2023",
    rating: 5,
    testimonial: "The communication throughout the process was exceptional. Regular updates, photos, and videos helped us bond with Daisy before we even met her. She's brought so much joy to our empty nest!",
    image: "/images/testimonials/chen-family.jpg",
    puppyImage: "/images/testimonials/daisy-now.jpg",
    featured: false
  },
  {
    id: 5,
    customerName: "Amanda Rodriguez",
    location: "Jackson, MS",
    puppyName: "Max",
    puppyBreed: "F1B Standard Labradoodle",
    adoptionDate: "October 2023",
    rating: 5,
    testimonial: "Max's gentle nature with my elderly mother has been incredible. He seems to understand exactly what she needs. The breeder's knowledge about temperament matching was spot on.",
    image: "/images/testimonials/rodriguez-family.jpg",
    puppyImage: "/images/testimonials/max-now.jpg",
    featured: false
  }
]

export const getFeaturedTestimonials = (count = 3) => {
  return testimonials.filter(testimonial => testimonial.featured).slice(0, count)
}

export const getAllTestimonials = () => {
  return testimonials
}

export const getTestimonialById = (id) => {
  return testimonials.find(testimonial => testimonial.id === parseInt(id))
}