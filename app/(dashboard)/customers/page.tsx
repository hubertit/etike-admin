"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Search, Mail, Phone, MapPin } from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Real customers data
  const mockCustomers = [
    {
      id: "CUST-001",
      name: "Olivier De Pooter",
      email: "rwanda2025@gracias.be",
      phone: "0032 495 10 05 48",
      location: "Edward Pecherstraat 14, 2000 Antwerp, Belgium",
      totalBookings: 1,
      totalSpent: 1200,
      lastBooking: "2024-07-15",
      joinDate: "2024-07-10",
      status: "active",
    },
    {
      id: "CUST-002",
      name: "Patrick De Schepper",
      email: "rwanda2025@gracias.be",
      phone: "0032 498 93 29 80",
      location: "Burg. De Dierlaan 4, 9473 Denderleeuw, Belgium",
      totalBookings: 1,
      totalSpent: 1500,
      lastBooking: "2024-07-20",
      joinDate: "2024-07-15",
      status: "active",
    },
    {
      id: "CUST-003",
      name: "Fabrice Rogiers",
      email: "rwanda2025@gracias.be",
      phone: "0032 479 530 969",
      location: "Gastonroelandtsstraat 16B, 8020 Oostkamp, Belgium",
      totalBookings: 1,
      totalSpent: 800,
      lastBooking: "2024-07-25",
      joinDate: "2024-07-20",
      status: "active",
    },
    {
      id: "CUST-004",
      name: "Dirk D'Hulster",
      email: "rwanda2025@gracias.be",
      phone: "0032 477 30 22 77",
      location: "Kasteelstraat 23, 8600 Diksmuide, Belgium",
      totalBookings: 2,
      totalSpent: 2400,
      lastBooking: "2024-08-01",
      joinDate: "2024-07-25",
      status: "active",
    },
    {
      id: "CUST-005",
      name: "Steven Andries",
      email: "rwanda2025@gracias.be",
      phone: "0032 495 91 56 01",
      location: "Sint Annaplein 34, 9000 Gent, Belgium",
      totalBookings: 1,
      totalSpent: 1000,
      lastBooking: "2024-08-05",
      joinDate: "2024-08-01",
      status: "active",
    },
    {
      id: "CUST-006",
      name: "Heidi De Koninck",
      email: "rwanda2025@gracias.be",
      phone: "0032 476 54 19 54",
      location: "Britselei 80, 2000 Antwerp, Belgium",
      totalBookings: 1,
      totalSpent: 900,
      lastBooking: "2024-08-10",
      joinDate: "2024-08-05",
      status: "active",
    },
    {
      id: "CUST-007",
      name: "Marie Segaert",
      email: "rwanda2025@gracias.be",
      phone: "0032 471 11 60 98",
      location: "Britselei 80, 2000 Antwerp, Belgium",
      totalBookings: 1,
      totalSpent: 750,
      lastBooking: "2024-08-15",
      joinDate: "2024-08-10",
      status: "active",
    },
    {
      id: "CUST-008",
      name: "Pawel Dziewiałtowski-Gintowt",
      email: "rwanda2025@gracias.be",
      phone: "0048 663 558 658",
      location: "UI. Jana Gutenberga 9, 62-023 Zerniki, Poland",
      totalBookings: 1,
      totalSpent: 1100,
      lastBooking: "2024-08-20",
      joinDate: "2024-08-15",
      status: "active",
    },
    {
      id: "CUST-009",
      name: "Christophe Guillé",
      email: "rwanda2025@gracias.be",
      phone: "0048 603 109 100",
      location: "Hooiweg 39, 2222 Itegem, Belgium",
      totalBookings: 1,
      totalSpent: 1300,
      lastBooking: "2024-08-25",
      joinDate: "2024-08-20",
      status: "active",
    },
    {
      id: "CUST-010",
      name: "Fred Vandermarliere",
      email: "rwanda2025@gracias.be",
      phone: "0032 476 61 13 68",
      location: "Pannenbakkersstraat 1, 8552 Zwevegem, Belgium",
      totalBookings: 1,
      totalSpent: 950,
      lastBooking: "2024-09-01",
      joinDate: "2024-08-25",
      status: "active",
    },
    {
      id: "CUST-011",
      name: "Anthony Militello",
      email: "rwanda2025@gracias.be",
      phone: "01 716 548 5094",
      location: "137th AVE, NE APT K101 17260, 98072 Woodinville, Washington, United States",
      totalBookings: 1,
      totalSpent: 1800,
      lastBooking: "2024-09-05",
      joinDate: "2024-09-01",
      status: "active",
    },
    {
      id: "CUST-012",
      name: "Domen Žigante",
      email: "rwanda2025@gracias.be",
      phone: "00386 51 348 164",
      location: "Celovška 25, 1000 Ljubljana, Slovenia",
      totalBookings: 1,
      totalSpent: 1200,
      lastBooking: "2024-09-10",
      joinDate: "2024-09-05",
      status: "active",
    },
    {
      id: "CUST-013",
      name: "Dirk Verbeeck",
      email: "rwanda2025@gracias.be",
      phone: "0032 475 74 25 16",
      location: "Pottenbrug 3/224, 2000 Antwerpen, Belgium",
      totalBookings: 1,
      totalSpent: 850,
      lastBooking: "2024-09-15",
      joinDate: "2024-09-10",
      status: "active",
    },
    {
      id: "CUST-014",
      name: "Peter Demets",
      email: "rwanda2025@gracias.be",
      phone: "0032473414940",
      location: "Schoebroekstraat 8, 3583 Beringen, Belgium",
      totalBookings: 1,
      totalSpent: 700,
      lastBooking: "2024-09-20",
      joinDate: "2024-09-15",
      status: "active",
    },
    {
      id: "CUST-015",
      name: "Kasper Momme",
      email: "rwanda2025@gracias.be",
      phone: "004523488777",
      location: "Gertrud Rasks Vej 187, 3210 Aalborg, Denmark",
      totalBookings: 1,
      totalSpent: 1400,
      lastBooking: "2024-09-25",
      joinDate: "2024-09-20",
      status: "active",
    },
    {
      id: "CUST-016",
      name: "Thomas Geraint",
      email: "rwanda2025@gracias.be",
      phone: "0044 7774 127441",
      location: "Dancer Road 48, TW94LA Richmond upon Thames UK",
      totalBookings: 1,
      totalSpent: 1600,
      lastBooking: "2024-09-30",
      joinDate: "2024-09-25",
      status: "active",
    },
    {
      id: "CUST-017",
      name: "Yvo Van Reeth",
      email: "rwanda2025@gracias.be",
      phone: "0032476020934",
      location: "Hoek 28, 2850 Boom, Belgium",
      totalBookings: 1,
      totalSpent: 900,
      lastBooking: "2024-10-05",
      joinDate: "2024-09-30",
      status: "active",
    },
    {
      id: "CUST-018",
      name: "Bart De Smet",
      email: "rwanda2025@gracias.be",
      phone: "0032473414940",
      location: "Schoebroekstraat 8, 3583 Beringen, Belgium",
      totalBookings: 1,
      totalSpent: 1100,
      lastBooking: "2024-10-10",
      joinDate: "2024-10-05",
      status: "active",
    },
    {
      id: "CUST-019",
      name: "Douglas Konzuk",
      email: "rwanda2025@gracias.be",
      phone: "0031646497272",
      location: "Douglas 33, 4604 äramali, Cyprus",
      totalBookings: 1,
      totalSpent: 1300,
      lastBooking: "2024-10-15",
      joinDate: "2024-10-10",
      status: "active",
    },
    {
      id: "CUST-020",
      name: "Steven Buyse",
      email: "rwanda2025@gracias.be",
      phone: "0032479220220",
      location: "Middenhutlaan 44, 1640 Sint Genesius Rode, Belgium",
      totalBookings: 1,
      totalSpent: 800,
      lastBooking: "2024-10-20",
      joinDate: "2024-10-15",
      status: "active",
    },
    {
      id: "CUST-021",
      name: "Dennis Van Loone",
      email: "rwanda2025@gracias.be",
      phone: "0032470567755",
      location: "Marsweg 25, 2990 Loenhout, Belgium",
      totalBookings: 1,
      totalSpent: 1000,
      lastBooking: "2024-10-25",
      joinDate: "2024-10-20",
      status: "active",
    },
    {
      id: "CUST-022",
      name: "Job Nouwens",
      email: "rwanda2025@gracias.be",
      phone: "+31639585506",
      location: "Stephensonstraat 10-Z, 1097BB Amsterdam, Netherlands",
      totalBookings: 1,
      totalSpent: 1200,
      lastBooking: "2024-10-30",
      joinDate: "2024-10-25",
      status: "active",
    },
    {
      id: "CUST-023",
      name: "Karl Lechat",
      email: "rwanda2025@gracias.be",
      phone: "0032497572361",
      location: "Geldenaaksebaan 326, 3001 Heverlee, Belgium",
      totalBookings: 1,
      totalSpent: 950,
      lastBooking: "2024-11-05",
      joinDate: "2024-10-30",
      status: "active",
    },
    {
      id: "CUST-024",
      name: "Jonas Jaspers",
      email: "rwanda2025@gracias.be",
      phone: "0032 491 35 29 25",
      location: "Clemtinastraat 25, 2018 Antwerpen, Belgium",
      totalBookings: 1,
      totalSpent: 850,
      lastBooking: "2024-11-10",
      joinDate: "2024-11-05",
      status: "active",
    },
    {
      id: "CUST-025",
      name: "Frank Riviere",
      email: "rwanda2025@gracias.be",
      phone: "0032496258816",
      location: "Stationsstraat 41, 8460 Oudenburg, Belgium",
      totalBookings: 1,
      totalSpent: 1100,
      lastBooking: "2024-11-15",
      joinDate: "2024-11-10",
      status: "active",
    },
    {
      id: "CUST-026",
      name: "Michel Francken",
      email: "rwanda2025@gracias.be",
      phone: "0473414940",
      location: "Kwikstaartweg 30, 3110 Rotselaar, Belgium",
      totalBookings: 1,
      totalSpent: 900,
      lastBooking: "2024-11-20",
      joinDate: "2024-11-15",
      status: "active",
    },
    {
      id: "CUST-027",
      name: "Christophe Impens",
      email: "rwanda2025@gracias.be",
      phone: "0473414940",
      location: "Schoebroekstraat 8, 3583 Beringen, Belgium",
      totalBookings: 1,
      totalSpent: 1000,
      lastBooking: "2024-11-25",
      joinDate: "2024-11-20",
      status: "active",
    },
    {
      id: "CUST-028",
      name: "Glen Ho",
      email: "rwanda2025@gracias.be",
      phone: "0798733192",
      location: "1 Le Mirage, Anaboom Street, Randpark Ridge, 2169 Gauteng, South Africa",
      totalBookings: 1,
      totalSpent: 1500,
      lastBooking: "2024-11-30",
      joinDate: "2024-11-25",
      status: "active",
    },
    {
      id: "CUST-029",
      name: "Peter De Jonghe",
      email: "rwanda2025@gracias.be",
      phone: "0032 468 020 155",
      location: "Stroobantsstraat 48B/5, 1140 Evere, Belgium",
      totalBookings: 1,
      totalSpent: 1200,
      lastBooking: "2024-12-05",
      joinDate: "2024-11-30",
      status: "active",
    },
    {
      id: "CUST-030",
      name: "Jeroen Leen",
      email: "rwanda2025@gracias.be",
      phone: "0032495583075",
      location: "DE BURBURESTRAAT 17/202, 2000 Antwerpen, Belgium",
      totalBookings: 1,
      totalSpent: 1300,
      lastBooking: "2024-12-10",
      joinDate: "2024-12-05",
      status: "active",
    },
  ]

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleContactCustomer = (customerId: string, method: string) => {
    console.log(`Contacting customer ${customerId} via ${method}`)
    alert(`Opening ${method} for customer ${customerId}`)
  }

  const columns = [
    {
      key: "no",
      label: "No.",
      render: (value: any, row: any, index?: number) => (
        <span className="text-sm text-gray-600">{(index || 0) + 1}</span>
      )
    },
    {
      key: "name",
      label: "Customer",
      render: (value: any) => (
        <div>
          <p className="font-medium">{value}</p>
        </div>
      )
    },
    {
      key: "contact",
      label: "Contact",
      render: (value: any, row: any) => (
        <div>
          <p className="text-sm">{row.email}</p>
          <p className="text-sm text-gray-500">{row.phone}</p>
        </div>
      )
    },
    {
      key: "location",
      label: "Location",
      render: (value: any) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          {value}
        </div>
      )
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleContactCustomer(row.id, "email")}
            className="p-1 text-gray-400 hover:text-[#0f3373]"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleContactCustomer(row.id, "phone")}
            className="p-1 text-gray-400 hover:text-[#0f3373]"
            title="Call Customer"
          >
            <Phone className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const searchActions = (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search customers..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0f3373] focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      <DataTable
        title=""
        columns={columns}
        data={filteredCustomers}
        actions={searchActions}
      />
    </div>
  )
}
