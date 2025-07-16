export const adoptionSteps = [
  {
    id: 1,
    stepNumber: 1,
    title: "Initial Inquiry",
    subtitle: "Get to know us",
    description: "Submit an inquiry about a specific puppy or our upcoming litters. We'll respond within 24 hours to discuss your family's needs and lifestyle.",
    icon: "MessageCircle",
    estimatedTime: "Same day",
    details: [
      "Complete our online inquiry form",
      "Tell us about your experience with dogs", 
      "Describe your living situation and family",
      "Let us know your preferences for size, color, and temperament"
    ]
  },
  {
    id: 2,
    stepNumber: 2,
    title: "Application & Screening",
    subtitle: "Finding the perfect match",
    description: "Complete our detailed application so we can match you with the right puppy. We believe in finding the perfect fit for both family and puppy.",
    icon: "FileText",
    estimatedTime: "2-3 days",
    details: [
      "Fill out comprehensive adoption application",
      "Provide references from veterinarian (if applicable)",
      "Phone or video interview with our team",
      "Discussion about training and care expectations"
    ]
  },
  {
    id: 3,
    stepNumber: 3,
    title: "Deposit & Reservation",
    subtitle: "Securing your puppy",
    description: "Once approved and matched with a puppy, place a deposit to reserve your new family member. We'll keep you updated with photos and videos.",
    icon: "CreditCard",
    estimatedTime: "1 day",
    details: [
      "Submit $500 non-refundable deposit",
      "Receive puppy reservation confirmation",
      "Get access to weekly photo and video updates",
      "Join our private Facebook group for adopting families"
    ]
  },
  {
    id: 4,
    stepNumber: 4,
    title: "Puppy Development",
    subtitle: "Growing up with love",
    description: "Your puppy grows up in our home environment with early socialization, basic training, and lots of love. We provide regular updates during this special time.",
    icon: "Heart",
    estimatedTime: "6-8 weeks",
    details: [
      "Early neurological stimulation (ENS) program",
      "Socialization with children, adults, and other dogs",
      "Basic house training and crate introduction",
      "Age-appropriate vaccinations and health checks"
    ]
  },
  {
    id: 5,
    stepNumber: 5,
    title: "Pre-Pickup Preparation",
    subtitle: "Getting ready to go home",
    description: "Final health checks, vaccinations, and preparation for pickup. We'll coordinate the best time for your family to meet your new puppy.",
    icon: "Calendar",
    estimatedTime: "1 week",
    details: [
      "Final veterinary health examination",
      "Microchip registration in your name",
      "Puppy starter pack preparation",
      "Schedule pickup appointment"
    ]
  },
  {
    id: 6,
    stepNumber: 6,
    title: "Welcome Home",
    subtitle: "The beginning of your journey",
    description: "Pick up your new family member! We provide ongoing support and are always available for questions as your puppy settles into their new home.",
    icon: "Home",
    estimatedTime: "Ongoing",
    details: [
      "Meet your puppy and complete adoption paperwork",
      "Receive health records and care instructions",
      "Get puppy starter pack with food, toys, and essentials",
      "Lifetime breeder support for questions and guidance"
    ]
  }
]

export const getAdoptionSteps = () => {
  return adoptionSteps
}