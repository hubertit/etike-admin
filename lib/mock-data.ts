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
    servicePackage: "Luxury Hotel Suite Package",
    customer: "John Doe",
  },
  {
    id: "BKG002",
    method: "Bank Transfer",
    amount: 1200,
    status: "Pending",
    date: "2024-03-15 13:45",
    servicePackage: "Spa & Wellness Retreat",
    customer: "Sarah Johnson",
  },
  {
    id: "BKG003",
    method: "Credit Card",
    amount: 2400,
    status: "Cancelled",
    date: "2024-03-15 12:20",
    servicePackage: "Fine Dining Experience",
    customer: "Mike Wilson",
  },
  {
    id: "BKG004",
    method: "PayPal",
    amount: 1800,
    status: "Confirmed",
    date: "2024-03-15 11:15",
    servicePackage: "Luxury Hotel Suite Package",
    customer: "Emma Brown",
  },
  {
    id: "BKG005",
    method: "Credit Card",
    amount: 1200,
    status: "Confirmed",
    date: "2024-03-15 10:30",
    servicePackage: "Spa & Wellness Retreat",
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
  { month: "Jul", revenue: 12000 },
  { month: "Aug", revenue: 18500 },
  { month: "Sep", revenue: 22100 },
]

export const revenueData = bookingRevenueData
