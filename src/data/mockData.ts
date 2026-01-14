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
    partner: { name: 'Rajesh Kumar', phone: '+91 98765 43210', rating: 4.8 },
  },
  {
    id: 'ORD002',
    date: '2024-01-18',
    time: '2:00 PM - 4:00 PM',
    status: 'on_the_way',
    items: ['E-Waste - 4kg', 'Plastic - 2kg'],
    estimatedAmount: 160,
    partner: { name: 'Amit Singh', phone: '+91 98765 43211', rating: 4.5 },
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
  },
];

export const mockPartners = [
  { id: 'PTR001', name: 'Rajesh Kumar', phone: '+91 98765 43210', rating: 4.8, status: 'active', totalPickups: 156 },
  { id: 'PTR002', name: 'Suresh Yadav', phone: '+91 98765 43216', rating: 4.6, status: 'active', totalPickups: 124 },
  { id: 'PTR003', name: 'Anil Sharma', phone: '+91 98765 43217', rating: 4.9, status: 'active', totalPickups: 189 },
  { id: 'PTR004', name: 'Deepak Gupta', phone: '+91 98765 43218', rating: 4.4, status: 'inactive', totalPickups: 87 },
];
