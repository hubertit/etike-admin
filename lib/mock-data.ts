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

export const mockTransactions = [
  {
    id: "TXN001",
    method: "Credit Card",
    amount: 299.99,
    status: "Completed",
    date: "2024-03-15 14:30",
    merchant: "TechCorp Solutions",
  },
  {
    id: "TXN002",
    method: "PayPal",
    amount: 149.5,
    status: "Pending",
    date: "2024-03-15 13:45",
    merchant: "E-Shop Plus",
  },
  {
    id: "TXN003",
    method: "Bank Transfer",
    amount: 599.0,
    status: "Failed",
    date: "2024-03-15 12:20",
    merchant: "Digital Mart",
  },
  {
    id: "TXN004",
    method: "Credit Card",
    amount: 89.99,
    status: "Completed",
    date: "2024-03-15 11:15",
    merchant: "Quick Pay Store",
  },
  {
    id: "TXN005",
    method: "Debit Card",
    amount: 199.99,
    status: "Completed",
    date: "2024-03-15 10:30",
    merchant: "TechCorp Solutions",
  },
]

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

export const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
]
