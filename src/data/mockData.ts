// Mock data for the scrap pickup application

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export const scrapRates = [
  { id: 1, name: 'Newspaper', rate: 14, unit: 'kg', icon: '📰', category: 'Paper' },
  { id: 2, name: 'Cardboard', rate: 8, unit: 'kg', icon: '📦', category: 'Paper' },
  { id: 3, name: 'Books/Magazines', rate: 12, unit: 'kg', icon: '📚', category: 'Paper' },
  { id: 4, name: 'Iron', rate: 28, unit: 'kg', icon: '🔩', category: 'Metal' },
  { id: 5, name: 'Aluminium', rate: 105, unit: 'kg', icon: '🥫', category: 'Metal' },
  { id: 6, name: 'Copper', rate: 425, unit: 'kg', icon: '🔌', category: 'Metal' },
  { id: 7, name: 'Brass', rate: 305, unit: 'kg', icon: '🔔', category: 'Metal' },
  { id: 8, name: 'Plastic (Mixed)', rate: 10, unit: 'kg', icon: '♻️', category: 'Plastic' },
  { id: 9, name: 'Plastic (Hard)', rate: 15, unit: 'kg', icon: '🪣', category: 'Plastic' },
  { id: 10, name: 'E-Waste', rate: 35, unit: 'kg', icon: '💻', category: 'Electronics' },
  { id: 11, name: 'Batteries', rate: 65, unit: 'kg', icon: '🔋', category: 'Electronics' },
  { id: 12, name: 'Glass Bottles', rate: 2, unit: 'piece', icon: '🍾', category: 'Glass' },
];

export const scrapCategories = [
  { id: 'paper', name: 'Paper', icon: '📄', color: 'bg-amber-100' },
  { id: 'metal', name: 'Metal', icon: '🔩', color: 'bg-slate-100' },
  { id: 'plastic', name: 'Plastic', icon: '♻️', color: 'bg-blue-100' },
  { id: 'electronics', name: 'Electronics', icon: '💻', color: 'bg-purple-100' },
  { id: 'glass', name: 'Glass', icon: '🍾', color: 'bg-teal-100' },
  { id: 'appliances', name: 'Appliances', icon: '🔌', color: 'bg-orange-100' },
];

export const timeSlots = [
  { id: 1, time: '9:00 AM - 11:00 AM', available: true },
  { id: 2, time: '11:00 AM - 1:00 PM', available: true },
  { id: 3, time: '2:00 PM - 4:00 PM', available: true },
  { id: 4, time: '4:00 PM - 6:00 PM', available: false },
  { id: 5, time: '6:00 PM - 8:00 PM', available: true },
];

export const orderStatuses = [
  { id: 1, status: 'pending', label: 'Pending', description: 'Waiting for partner assignment' },
  { id: 2, status: 'assigned', label: 'Partner Assigned', description: 'A partner has been assigned' },
  { id: 3, status: 'on_the_way', label: 'On the Way', description: 'Partner is coming to your location' },
  { id: 4, status: 'at_location', label: 'At Location', description: 'Partner has arrived' },
  { id: 5, status: 'picked_up', label: 'Picked Up', description: 'Scrap has been collected' },
  { id: 6, status: 'completed', label: 'Completed', description: 'Order completed successfully' },
];

export const mockOrders = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    time: '10:00 AM - 12:00 PM',
    status: 'completed',
    items: ['Newspaper - 5kg', 'Cardboard - 3kg', 'Iron - 2kg'],
    totalAmount: 156,
    partner: { name: 'Rajesh Kumar', phone: '+91 98765 43210', rating: 4.8, lat: 19.1156, lng: 72.8879 },
    address: '42, Green Valley Apartments, Andheri West, Mumbai',
    lat: 19.1196,
    lng: 72.8929,
  },
  {
    id: 'ORD002',
    date: '2024-01-18',
    time: '2:00 PM - 4:00 PM',
    status: 'on_the_way',
    items: ['E-Waste - 4kg', 'Plastic - 2kg'],
    estimatedAmount: 160,
    partner: { name: 'Amit Singh', phone: '+91 98765 43211', rating: 4.5, lat: 19.1180, lng: 72.8900 },
    address: '15, Sunshine Society, Bandra East, Mumbai',
    lat: 19.1220,
    lng: 72.8940,
  },
  {
    id: 'ORD003',
    date: '2024-01-10',
    time: '9:00 AM - 11:00 AM',
    status: 'completed',
    items: ['Iron - 8kg', 'Aluminium - 3kg'],
    totalAmount: 539,
    partner: { name: 'Suresh Yadav', phone: '+91 98765 43216', rating: 4.6 },
    address: '23, Palm Grove, Powai, Mumbai',
  },
  {
    id: 'ORD004',
    date: '2024-01-05',
    time: '4:00 PM - 6:00 PM',
    status: 'completed',
    items: ['Newspaper - 10kg', 'Books - 5kg'],
    totalAmount: 200,
    partner: { name: 'Anil Sharma', phone: '+91 98765 43217', rating: 4.9 },
    address: '78, Lake View Towers, Hiranandani, Mumbai',
  },
];

// Wallet transactions
export const mockWalletTransactions = [
  { id: 'TXN001', type: 'credit', amount: 156, description: 'Pickup ORD001 completed', date: '2024-01-15', orderId: 'ORD001' },
  { id: 'TXN002', type: 'credit', amount: 539, description: 'Pickup ORD003 completed', date: '2024-01-10', orderId: 'ORD003' },
  { id: 'TXN003', type: 'debit', amount: 500, description: 'Bank transfer', date: '2024-01-12', status: 'completed' },
  { id: 'TXN004', type: 'credit', amount: 200, description: 'Pickup ORD004 completed', date: '2024-01-05', orderId: 'ORD004' },
  { id: 'TXN005', type: 'credit', amount: 50, description: 'Referral bonus', date: '2024-01-02', bonus: true },
];

export const mockWalletBalance = 445;

// Coupons
export const mockCoupons = [
  { 
    id: 'COUP001', 
    code: 'FIRST50', 
    discount: 50, 
    discountType: 'flat',
    description: 'Get ₹50 extra on your first pickup!', 
    minAmount: 100,
    validTill: '2024-02-28',
    used: false,
    category: 'new_user'
  },
  { 
    id: 'COUP002', 
    code: 'METAL10', 
    discount: 10, 
    discountType: 'percentage',
    description: '10% extra on all metal items!', 
    minAmount: 200,
    validTill: '2024-01-31',
    used: false,
    category: 'category_bonus'
  },
  { 
    id: 'COUP003', 
    code: 'WEEKEND', 
    discount: 25, 
    discountType: 'flat',
    description: '₹25 extra on weekend pickups!', 
    minAmount: 150,
    validTill: '2024-02-15',
    used: true,
    category: 'promotional'
  },
];

// Blog posts
export const mockBlogs = [
  {
    id: 'BLOG001',
    title: 'How to Segregate Your Household Waste Properly',
    excerpt: 'Learn the best practices for separating recyclables from non-recyclables at home.',
    content: `Proper waste segregation is the first step towards a sustainable environment. Here's how you can do it effectively:

1. **Dry Waste**: Paper, cardboard, plastic bottles, metal cans
2. **Wet Waste**: Kitchen scraps, food waste, garden waste
3. **E-Waste**: Old phones, batteries, cables, chargers
4. **Hazardous**: Paint, chemicals, medical waste

Keep separate bins for each category and ensure items are clean before disposal.`,
    author: 'Priya Sharma',
    date: '2024-01-18',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    category: 'Tips',
    published: true,
  },
  {
    id: 'BLOG002',
    title: 'The Impact of Recycling on Our Environment',
    excerpt: 'Discover how your small recycling efforts contribute to a bigger environmental change.',
    content: `Recycling has a profound impact on our environment. Here are some facts:

- Recycling one aluminum can saves enough energy to run a TV for 3 hours
- Every ton of paper recycled saves 17 trees
- Recycling plastic reduces ocean pollution by up to 40%

Join the movement and make a difference today!`,
    author: 'Rajesh Kumar',
    date: '2024-01-15',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
    category: 'Environment',
    published: true,
  },
  {
    id: 'BLOG003',
    title: 'Top 10 Items You Didn\'t Know Were Recyclable',
    excerpt: 'Surprising items that can be recycled and turned into something new.',
    content: `You might be throwing away items that could be recycled:

1. Old CDs and DVDs
2. Wine corks
3. Eyeglasses
4. Old keys
5. Ink cartridges
6. Crayons
7. Tennis balls
8. Running shoes
9. Mattresses
10. Cooking oil`,
    author: 'Sneha Reddy',
    date: '2024-01-12',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    category: 'Tips',
    published: true,
  },
];

export const mockPartnerData = {
  id: 'PTR001',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  rating: 4.8,
  totalPickups: 156,
  earnings: {
    today: 850,
    week: 5200,
    month: 22500,
  },
  assignedPickups: [
    {
      id: 'ORD003',
      customerName: 'Priya Sharma',
      address: '42, Green Valley Apartments, Andheri West, Mumbai',
      phone: '+91 98765 43212',
      date: '2024-01-20',
      time: '10:00 AM - 12:00 PM',
      items: ['Newspaper - 8kg', 'Iron - 5kg'],
      estimatedAmount: 252,
      status: 'assigned',
      lat: 19.1196,
      lng: 72.8929,
      otp: '4521',
    },
    {
      id: 'ORD004',
      customerName: 'Vikram Patel',
      address: '15, Sunshine Society, Bandra East, Mumbai',
      phone: '+91 98765 43213',
      date: '2024-01-20',
      time: '2:00 PM - 4:00 PM',
      items: ['E-Waste - 3kg', 'Copper - 1kg'],
      estimatedAmount: 530,
      status: 'pending',
      lat: 19.0596,
      lng: 72.8295,
      otp: '7832',
    },
  ],
};

export const mockAdminStats = {
  totalPickups: 1256,
  activeUsers: 892,
  activePartners: 45,
  revenue: {
    today: 12500,
    week: 85000,
    month: 345000,
  },
  pendingRequests: 23,
  completedToday: 18,
  cancelledToday: 2,
  avgRating: 4.7,
};

export const mockAdminOrders = [
  {
    id: 'ORD001',
    customerName: 'Rahul Verma',
    customerPhone: '+91 98765 43214',
    address: '23, Palm Grove, Powai, Mumbai',
    date: '2024-01-20',
    time: '10:00 AM - 12:00 PM',
    items: ['Newspaper - 10kg', 'Cardboard - 5kg'],
    estimatedAmount: 180,
    status: 'pending',
    partner: null,
    lat: 19.1273,
    lng: 72.9033,
  },
  {
    id: 'ORD002',
    customerName: 'Sneha Reddy',
    customerPhone: '+91 98765 43215',
    address: '78, Lake View Towers, Hiranandani, Mumbai',
    date: '2024-01-20',
    time: '2:00 PM - 4:00 PM',
    items: ['Iron - 8kg', 'Aluminium - 2kg'],
    estimatedAmount: 434,
    status: 'assigned',
    partner: { id: 'PTR002', name: 'Suresh Yadav' },
    lat: 19.1223,
    lng: 72.9140,
  },
  {
    id: 'ORD003',
    customerName: 'Amit Kumar',
    customerPhone: '+91 98765 43220',
    address: '56, Marine Drive, South Mumbai',
    date: '2024-01-20',
    time: '11:00 AM - 1:00 PM',
    items: ['E-Waste - 5kg', 'Batteries - 2kg'],
    estimatedAmount: 305,
    status: 'on_the_way',
    partner: { id: 'PTR003', name: 'Anil Sharma' },
    lat: 18.9432,
    lng: 72.8235,
  },
];

export const mockPartners = [
  { id: 'PTR001', name: 'Rajesh Kumar', phone: '+91 98765 43210', rating: 4.8, status: 'active', totalPickups: 156, email: 'rajesh@email.com', joinDate: '2023-06-15', area: 'Andheri' },
  { id: 'PTR002', name: 'Suresh Yadav', phone: '+91 98765 43216', rating: 4.6, status: 'active', totalPickups: 124, email: 'suresh@email.com', joinDate: '2023-08-22', area: 'Bandra' },
  { id: 'PTR003', name: 'Anil Sharma', phone: '+91 98765 43217', rating: 4.9, status: 'active', totalPickups: 189, email: 'anil@email.com', joinDate: '2023-05-10', area: 'Powai' },
  { id: 'PTR004', name: 'Deepak Gupta', phone: '+91 98765 43218', rating: 4.4, status: 'inactive', totalPickups: 87, email: 'deepak@email.com', joinDate: '2023-09-01', area: 'Malad' },
  { id: 'PTR005', name: 'Vikram Singh', phone: '+91 98765 43219', rating: 4.7, status: 'active', totalPickups: 203, email: 'vikram@email.com', joinDate: '2023-04-18', area: 'Dadar' },
];

// Customer profile
export const mockCustomerProfile = {
  id: 'CUST001',
  name: 'Rahul Sharma',
  phone: '+91 98765 43210',
  email: 'rahul@email.com',
  address: '42, Green Valley Apartments, Andheri West, Mumbai',
  totalPickups: 12,
  totalEarnings: 2450,
  memberSince: '2023-10-15',
  referralCode: 'RAHUL50',
};

// Landing page stats
export const landingStats = {
  totalPickups: '50,000+',
  activeUsers: '10,000+',
  citiesCovered: '15+',
  scrapCollected: '500+ tons',
};

// Features for landing page
export const landingFeatures = [
  {
    icon: '📱',
    title: 'Easy Booking',
    description: 'Schedule a pickup in just 3 simple steps from our mobile-friendly app.',
  },
  {
    icon: '💰',
    title: 'Best Prices',
    description: 'Get the highest market rates for your scrap with transparent pricing.',
  },
  {
    icon: '🚛',
    title: 'Free Doorstep Pickup',
    description: 'Our verified partners come to your doorstep at your convenient time.',
  },
  {
    icon: '⚖️',
    title: 'Digital Weighing',
    description: 'Accurate digital weighing ensures you get paid fairly for every gram.',
  },
  {
    icon: '💳',
    title: 'Instant Payment',
    description: 'Receive payment directly to your wallet or bank account instantly.',
  },
  {
    icon: '♻️',
    title: 'Eco-Friendly',
    description: 'Your scrap is responsibly recycled, reducing environmental impact.',
  },
];

// How it works steps
export const howItWorks = [
  {
    step: 1,
    title: 'Schedule Pickup',
    description: 'Select your scrap type, upload photos, and choose a convenient date & time.',
    icon: '📅',
  },
  {
    step: 2,
    title: 'Partner Arrives',
    description: 'A verified partner arrives at your doorstep with digital weighing equipment.',
    icon: '🚛',
  },
  {
    step: 3,
    title: 'Get Paid',
    description: 'After weighing, receive instant payment to your wallet or bank account.',
    icon: '💰',
  },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Amazing service! The partner was professional and I got a great price for my scrap.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 2,
    name: 'Amit Patel',
    location: 'Pune',
    rating: 5,
    comment: 'Very convenient app. I cleared my garage of old electronics and earned money too!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    location: 'Bangalore',
    rating: 4,
    comment: 'Quick pickup and fair pricing. Will definitely use again for my office waste.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  },
];
