export const mockMerchants = [
  {
    id: 1,
    name: "TechCorp Solutions",
    email: "contact@techcorp.com",
    phone: "+1-555-0123",
    status: "Active",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "E-Shop Plus",
    email: "admin@eshopplus.com",
    phone: "+1-555-0124",
    status: "Active",
    joinedDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Digital Mart",
    email: "info@digitalmart.com",
    phone: "+1-555-0125",
    status: "Pending",
    joinedDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Quick Pay Store",
    email: "support@quickpay.com",
    phone: "+1-555-0126",
    status: "Suspended",
    joinedDate: "2024-01-05",
  },
]

export const mockBookings = [
  {
    id: "BKG001",
    method: "Credit Card",
    amount: 1800,
    status: "Confirmed",
    date: "2024-03-15 14:30",
    tourPackage: "Gorilla Trekking Adventure",
    customer: "John Doe",
  },
  {
    id: "BKG002",
    method: "Bank Transfer",
    amount: 1200,
    status: "Pending",
    date: "2024-03-15 13:45",
    tourPackage: "Lake Kivu Relaxation",
    customer: "Sarah Johnson",
  },
  {
    id: "BKG003",
    method: "Credit Card",
    amount: 2400,
    status: "Cancelled",
    date: "2024-03-15 12:20",
    tourPackage: "Cultural Heritage Tour",
    customer: "Mike Wilson",
  },
  {
    id: "BKG004",
    method: "PayPal",
    amount: 1800,
    status: "Confirmed",
    date: "2024-03-15 11:15",
    tourPackage: "Gorilla Trekking Adventure",
    customer: "Emma Brown",
  },
  {
    id: "BKG005",
    method: "Credit Card",
    amount: 1200,
    status: "Confirmed",
    date: "2024-03-15 10:30",
    tourPackage: "Lake Kivu Relaxation",
    customer: "David Smith",
  },
]

export const mockTransactions = mockBookings.map((booking) => ({
  ...booking,
  merchant: booking.customer,
}))

export const mockSettlements = [
  { id: "SET001", merchant: "TechCorp Solutions", amount: 2499.99, status: "Completed", date: "2024-03-14" },
  { id: "SET002", merchant: "E-Shop Plus", amount: 1299.5, status: "Processing", date: "2024-03-15" },
  { id: "SET003", merchant: "Digital Mart", amount: 899.0, status: "Pending", date: "2024-03-15" },
  { id: "SET004", merchant: "Quick Pay Store", amount: 599.99, status: "Failed", date: "2024-03-13" },
]

export const mockWebhooks = [
  {
    id: 1,
    merchant: "TechCorp Solutions",
    url: "https://techcorp.com/webhook",
    status: "Active",
    lastAttempt: "2024-03-15 14:30",
  },
  {
    id: 2,
    merchant: "E-Shop Plus",
    url: "https://eshopplus.com/api/webhook",
    status: "Failed",
    lastAttempt: "2024-03-15 13:45",
  },
  {
    id: 3,
    merchant: "Digital Mart",
    url: "https://digitalmart.com/payments/webhook",
    status: "Active",
    lastAttempt: "2024-03-15 12:20",
  },
]

export const bookingRevenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]

export const revenueData = bookingRevenueData
