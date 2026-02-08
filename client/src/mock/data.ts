export interface Tutorial {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  views: number;
  creator: string;
  tags: string[];
}

export interface Kit {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  isAffiliate: boolean;
  commission: boolean;
}

export const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: "1",
    title: "Complete Guide to Organic Tomato Growing",
    thumbnail: "/images/tutorial-tomato.png",
    category: "Vegetables",
    duration: "12:45",
    difficulty: "Beginner",
    views: 1250,
    creator: "GreenThumb Tanya",
    tags: ["tomato", "summer", "vegetable"],
  },
  {
    id: "2",
    title: "Urban Composting: Zero Waste Living",
    thumbnail: "https://images.unsplash.com/photo-1591857177580-dc82b9e4e5c9?auto=format&fit=crop&q=80&w=800",
    category: "Composting",
    duration: "08:20",
    difficulty: "Beginner",
    views: 3400,
    creator: "EcoWarrior",
    tags: ["compost", "waste", "sustainable"],
  },
  {
    id: "3",
    title: "Natural Pest Control: Neem Oil Mastery",
    thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    category: "Pest Control",
    duration: "15:10",
    difficulty: "Intermediate",
    views: 890,
    creator: "Dr. Plant",
    tags: ["organic", "pest control", "neem"],
  },
  {
    id: "4",
    title: "Microgreens for Small Spaces",
    thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800",
    category: "Small Space",
    duration: "10:00",
    difficulty: "Beginner",
    views: 5600,
    creator: "Urban Jungle",
    tags: ["microgreens", "indoor", "quick"],
  },
];

export const MOCK_KITS: Kit[] = [
  {
    id: "1",
    name: "Premium Vermicompost Bin Kit",
    image: "/images/kit-compost.png",
    price: 2499,
    rating: 4.8,
    reviews: 124,
    description: "Everything you need to start composting at home today.",
    isAffiliate: true,
    commission: true,
  },
  {
    id: "2",
    name: "Organic Vegetable Seeds Starter Pack",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
    price: 499,
    rating: 4.5,
    reviews: 89,
    description: "Non-GMO seeds for 10 popular vegetables.",
    isAffiliate: false,
    commission: true,
  },
  {
    id: "3",
    name: "Cold Pressed Neem Oil (500ml)",
    image: "https://images.unsplash.com/photo-1615485500704-8e99099928b3?auto=format&fit=crop&q=80&w=800",
    price: 350,
    rating: 4.9,
    reviews: 210,
    description: "Pure organic neem oil for pest control.",
    isAffiliate: true,
    commission: false,
  },
    {
    id: "4",
    name: "Heavy Duty Garden Trowel",
    image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=800",
    price: 899,
    rating: 4.7,
    reviews: 56,
    description: "Rust-resistant stainless steel with ergonomic handle.",
    isAffiliate: true,
    commission: true,
  },
];

export const MOCK_CREATOR_STATS = {
  totalViews: 45200,
  watchTime: "1.2k hrs",
  commissions: 12500, // In Rupees
  engagementScore: 92,
  recentPayouts: [
    { date: "2024-02-01", amount: 4500, status: "Paid" },
    { date: "2024-01-01", amount: 3800, status: "Paid" },
  ],
};
