export const faqCategories = [
  {
    id: 1,
    title: "General Questions",
    icon: "HelpCircle",
    faqs: [
      {
        id: 1,
        question: "What is a labradoodle?",
        answer: "A labradoodle is a crossbreed between a Labrador Retriever and a Poodle. They combine the friendly, loyal nature of Labs with the intelligence and low-shedding coat of Poodles, making them excellent family companions."
      },
      {
        id: 2,
        question: "Are labradoodles hypoallergenic?",
        answer: "While no dog is 100% hypoallergenic, labradoodles are considered low-shedding and often better for people with allergies. The Poodle genetics contribute to a coat that produces less dander, but individual reactions can vary."
      },
      {
        id: 3,
        question: "How big do labradoodles get?",
        answer: "Labradoodle size depends on the Poodle parent. Miniature labradoodles: 15-25 lbs, Medium labradoodles: 30-45 lbs, Standard labradoodles: 50-80 lbs. We provide size estimates for each puppy based on their parents."
      },
      {
        id: 4,
        question: "What's the difference between F1, F1B, and F2 labradoodles?",
        answer: "F1 = First generation (Lab x Poodle), F1B = F1 bred back to Poodle (more Poodle traits), F2 = F1 x F1 (second generation). Each has different coat and temperament characteristics."
      }
    ]
  },
  {
    id: 2,
    title: "Adoption Process",
    icon: "FileText",
    faqs: [
      {
        id: 5,
        question: "How long is the adoption process?",
        answer: "From initial inquiry to taking your puppy home typically takes 2-8 weeks, depending on puppy availability and your readiness. We don't rush the process to ensure the best match for both family and puppy."
      },
      {
        id: 6,
        question: "What's included with my puppy?",
        answer: "Each puppy comes with: health records, first vaccinations, microchip, starter food supply, puppy pack with toys and supplies, health guarantee, and lifetime breeder support."
      },
      {
        id: 7,
        question: "Do you require a deposit?",
        answer: "Yes, a $500 non-refundable deposit is required to reserve your puppy. This ensures your commitment and helps us plan for your puppy's care until pickup day."
      },
      {
        id: 8,
        question: "Can I visit the puppies before deciding?",
        answer: "Absolutely! We encourage visits once puppies are 6+ weeks old. We'll schedule a meeting where you can interact with available puppies and see our facilities."
      }
    ]
  },
  {
    id: 3,
    title: "Health & Care",
    icon: "Heart",
    faqs: [
      {
        id: 9,
        question: "What health testing do you do?",
        answer: "All our breeding dogs undergo comprehensive health testing including hip and elbow clearances, eye clearances, heart clearances, and full genetic health panels to ensure the healthiest puppies possible."
      },
      {
        id: 10,
        question: "Do you provide a health guarantee?",
        answer: "Yes! We provide a comprehensive health guarantee covering genetic conditions for 2 years. We stand behind the health of our puppies and offer ongoing support throughout their lives."
      },
      {
        id: 11,
        question: "When can puppies leave for their new homes?",
        answer: "Puppies are ready to go home at 8-10 weeks old, after they've received appropriate vaccinations, health checks, and crucial early socialization with their mother and littermates."
      },
      {
        id: 12,
        question: "What if my puppy gets sick after I bring them home?",
        answer: "We provide 72-hour health guarantee and ongoing support. We work with families to address any health concerns and provide guidance on veterinary care and puppy wellness."
      }
    ]
  },
  {
    id: 4,
    title: "Pricing & Logistics",
    icon: "DollarSign",
    faqs: [
      {
        id: 13,
        question: "How much do your puppies cost?",
        answer: "Our labradoodle puppies range from $2,750-$3,000 depending on size, generation, and coat characteristics. Price includes health testing, vaccinations, microchip, and comprehensive support package."
      },
      {
        id: 14,
        question: "Do you ship puppies?",
        answer: "We prefer pickup for the best experience, but can arrange safe transport within 500 miles for an additional fee. We want to ensure every puppy has the smoothest transition to their new home."
      },
      {
        id: 15,
        question: "What payment methods do you accept?",
        answer: "We accept cash, certified checks, and bank transfers. Payment schedule: $500 deposit to reserve, remainder due at pickup. We provide detailed payment instructions after approval."
      },
      {
        id: 16,
        question: "Do you offer payment plans?",
        answer: "We work with families on a case-by-case basis. Contact us to discuss options if you need a payment arrangement - we want to help the right families find their perfect companion."
      }
    ]
  }
]

export const contactInfo = {
  primary: {
    name: "Sarah Mitchell",
    title: "Lead Breeder & Owner",
    phone: "(555) 123-4567",
    email: "sarah@loandladylabs.com",
    availability: "Monday-Saturday 9AM-6PM"
  },
  secondary: {
    name: "Emma Johnson",
    title: "Puppy Coordinator",
    phone: "(555) 123-4568",
    email: "emma@loandladylabs.com",
    availability: "Monday-Friday 10AM-5PM"
  },
  business: {
    name: "Lo and Lady Labs",
    address: {
      street: "1234 Country Lane",
      city: "Franklin",
      state: "Tennessee",
      zip: "37067",
      full: "1234 Country Lane, Franklin, TN 37067"
    },
    phone: "(555) 123-4567",
    email: "info@loandladylabs.com",
    website: "www.loandladylabs.com",
    socialMedia: {
      facebook: "facebook.com/loandladylabs",
      instagram: "@loandladylabs",
      youtube: "youtube.com/loandladylabs"
    }
  },
  visitingHours: {
    weekdays: "By appointment only",
    weekends: "Saturday 10AM-4PM (by appointment)",
    notes: "Please call ahead to schedule your visit. We limit visitors to ensure a calm environment for our puppies."
  },
  emergencyContact: {
    phone: "(555) 123-4569",
    availability: "After hours and weekends for current puppy families only"
  }
}

export const getFAQsByCategory = (categoryId) => {
  const category = faqCategories.find(cat => cat.id === categoryId)
  return category ? category.faqs : []
}

export const getAllFAQs = () => {
  return faqCategories.reduce((allFaqs, category) => {
    return [...allFaqs, ...category.faqs]
  }, [])
}

export const searchFAQs = (searchTerm) => {
  const allFaqs = getAllFAQs()
  return allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )
}