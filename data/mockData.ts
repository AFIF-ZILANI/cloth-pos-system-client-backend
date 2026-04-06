export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
};

export type BarcodeEntry = {
  id: string;
  productId: string;
  value: string;
  status: "active" | "deprecated";
  allocatedAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastVisit: string;
  status: "active" | "inactive";
  avatar: string;
  joinDate: string;
  address: string;
};

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  items: { productId: string; name: string; qty: number; price: number }[];
  total: number;
  status: "completed" | "pending" | "refunded" | "cancelled";
  date: string;
  paymentMethod: "cash" | "card" | "digital";
};

export const categories = [
  "All",
  "Beverages",
  "Food",
  "Electronics",
  "Clothing",
  "Beauty",
  "Books",
];

export const products: Product[] = [
  { id: "p1",  name: "Iced Latte",         category: "Beverages",   price: 4.99,  stock: 100, sku: "BEV-001", image: "☕", status: "in_stock" },
  { id: "p2",  name: "Green Tea",           category: "Beverages",   price: 3.49,  stock: 80,  sku: "BEV-002", image: "🍵", status: "in_stock" },
  { id: "p3",  name: "Sparkling Water",     category: "Beverages",   price: 2.29,  stock: 5,   sku: "BEV-003", image: "💧", status: "low_stock" },
  { id: "p4",  name: "Orange Juice",        category: "Beverages",   price: 3.99,  stock: 60,  sku: "BEV-004", image: "🍊", status: "in_stock" },
  { id: "p5",  name: "Croissant",           category: "Food",        price: 3.29,  stock: 40,  sku: "FOD-001", image: "🥐", status: "in_stock" },
  { id: "p6",  name: "Blueberry Muffin",    category: "Food",        price: 2.99,  stock: 25,  sku: "FOD-002", image: "🫐", status: "in_stock" },
  { id: "p7",  name: "Avocado Toast",       category: "Food",        price: 7.99,  stock: 0,   sku: "FOD-003", image: "🥑", status: "out_of_stock" },
  { id: "p8",  name: "Bagel with Cream",    category: "Food",        price: 4.49,  stock: 18,  sku: "FOD-004", image: "🥯", status: "in_stock" },
  { id: "p9",  name: "Wireless Earbuds",    category: "Electronics", price: 49.99, stock: 12,  sku: "ELC-001", image: "🎧", status: "in_stock" },
  { id: "p10", name: "Phone Charger",       category: "Electronics", price: 19.99, stock: 30,  sku: "ELC-002", image: "🔌", status: "in_stock" },
  { id: "p11", name: "USB Hub",             category: "Electronics", price: 24.99, stock: 3,   sku: "ELC-003", image: "💾", status: "low_stock" },
  { id: "p12", name: "Laptop Stand",        category: "Electronics", price: 34.99, stock: 8,   sku: "ELC-004", image: "💻", status: "in_stock" },
  { id: "p13", name: "Cotton T-Shirt",      category: "Clothing",    price: 14.99, stock: 50,  sku: "CLT-001", image: "👕", status: "in_stock" },
  { id: "p14", name: "Denim Jeans",         category: "Clothing",    price: 39.99, stock: 22,  sku: "CLT-002", image: "👖", status: "in_stock" },
  { id: "p15", name: "Face Serum",          category: "Beauty",      price: 29.99, stock: 15,  sku: "BTY-001", image: "🧴", status: "in_stock" },
  { id: "p16", name: "Lip Balm",            category: "Beauty",      price: 4.99,  stock: 2,   sku: "BTY-002", image: "💋", status: "low_stock" },
  { id: "p17", name: "Design Principles",   category: "Books",       price: 24.99, stock: 7,   sku: "BOK-001", image: "📚", status: "in_stock" },
  { id: "p18", name: "JavaScript Guide",    category: "Books",       price: 34.99, stock: 11,  sku: "BOK-002", image: "📖", status: "in_stock" },
];

// Barcode entries per product (some products have none, some have multiple incl. deprecated)
export const barcodeEntries: BarcodeEntry[] = [
  // p1 - Iced Latte: 3 active
  { id: "bc1",  productId: "p1",  value: "8901234567890", status: "active",     allocatedAt: "2025-01-10" },
  { id: "bc2",  productId: "p1",  value: "8901234567891", status: "active",     allocatedAt: "2025-03-05" },
  { id: "bc3",  productId: "p1",  value: "8901234567892", status: "active",     allocatedAt: "2025-06-18" },
  // p2 - Green Tea: 2 active, 1 deprecated
  { id: "bc4",  productId: "p2",  value: "8901234560010", status: "active",     allocatedAt: "2025-02-14" },
  { id: "bc5",  productId: "p2",  value: "8901234560011", status: "active",     allocatedAt: "2025-07-22" },
  { id: "bc6",  productId: "p2",  value: "8901234560012", status: "deprecated", allocatedAt: "2024-11-01" },
  // p3 - Sparkling Water: 1 active
  { id: "bc7",  productId: "p3",  value: "8901234561100", status: "active",     allocatedAt: "2025-04-30" },
  // p4 - Orange Juice: 2 active
  { id: "bc8",  productId: "p4",  value: "8901234562200", status: "active",     allocatedAt: "2025-01-20" },
  { id: "bc9",  productId: "p4",  value: "8901234562201", status: "active",     allocatedAt: "2025-09-09" },
  // p5 - Croissant: 1 active, 2 deprecated
  { id: "bc10", productId: "p5",  value: "8901234563300", status: "active",     allocatedAt: "2025-05-15" },
  { id: "bc11", productId: "p5",  value: "8901234563301", status: "deprecated", allocatedAt: "2024-08-12" },
  { id: "bc12", productId: "p5",  value: "8901234563302", status: "deprecated", allocatedAt: "2024-10-20" },
  // p6 - Blueberry Muffin: 1 active
  { id: "bc13", productId: "p6",  value: "8901234564400", status: "active",     allocatedAt: "2025-03-11" },
  // p7 - Avocado Toast: no barcodes (out of stock, untracked)
  // p8 - Bagel with Cream: 2 active
  { id: "bc14", productId: "p8",  value: "8901234565500", status: "active",     allocatedAt: "2025-02-28" },
  { id: "bc15", productId: "p8",  value: "8901234565501", status: "active",     allocatedAt: "2025-08-01" },
  // p9 - Wireless Earbuds: 3 active, 1 deprecated
  { id: "bc16", productId: "p9",  value: "8901234566600", status: "active",     allocatedAt: "2025-01-05" },
  { id: "bc17", productId: "p9",  value: "8901234566601", status: "active",     allocatedAt: "2025-04-14" },
  { id: "bc18", productId: "p9",  value: "8901234566602", status: "active",     allocatedAt: "2025-10-30" },
  { id: "bc19", productId: "p9",  value: "8901234566603", status: "deprecated", allocatedAt: "2024-12-01" },
  // p10 - Phone Charger: 2 active
  { id: "bc20", productId: "p10", value: "8901234567700", status: "active",     allocatedAt: "2025-06-06" },
  { id: "bc21", productId: "p10", value: "8901234567701", status: "active",     allocatedAt: "2025-11-15" },
  // p11 - USB Hub: no barcodes yet
  // p12 - Laptop Stand: 1 active, 1 deprecated
  { id: "bc22", productId: "p12", value: "8901234568800", status: "active",     allocatedAt: "2025-07-07" },
  { id: "bc23", productId: "p12", value: "8901234568801", status: "deprecated", allocatedAt: "2025-01-01" },
  // p13 - Cotton T-Shirt: 2 active
  { id: "bc24", productId: "p13", value: "8901234569900", status: "active",     allocatedAt: "2025-03-22" },
  { id: "bc25", productId: "p13", value: "8901234569901", status: "active",     allocatedAt: "2025-09-18" },
  // p14 - Denim Jeans: 1 active, 1 deprecated
  { id: "bc26", productId: "p14", value: "8901234560020", status: "active",     allocatedAt: "2025-05-05" },
  { id: "bc27", productId: "p14", value: "8901234560021", status: "deprecated", allocatedAt: "2024-09-30" },
  // p15 - Face Serum: 2 active
  { id: "bc28", productId: "p15", value: "8901234560030", status: "active",     allocatedAt: "2025-02-10" },
  { id: "bc29", productId: "p15", value: "8901234560031", status: "active",     allocatedAt: "2025-08-25" },
  // p16 - Lip Balm: 1 active
  { id: "bc30", productId: "p16", value: "8901234560040", status: "active",     allocatedAt: "2025-04-04" },
  // p17 - Design Principles: no barcodes yet
  // p18 - JavaScript Guide: 1 active
  { id: "bc31", productId: "p18", value: "8901234560050", status: "active",     allocatedAt: "2025-10-10" },
];


export const customers: Customer[] = [
  { id: "c1", name: "Alex Johnson",    email: "alex@example.com",      phone: "+1 (555) 234-5678", totalOrders: 23, totalSpent: 487.50,  lastVisit: "2026-03-29", status: "active",   avatar: "AJ", joinDate: "2024-05-12", address: "123 Main St, New York, NY 10001" },
  { id: "c2", name: "Sarah Kim",       email: "sarah@example.com",     phone: "+1 (555) 345-6789", totalOrders: 41, totalSpent: 1234.80, lastVisit: "2026-03-30", status: "active",   avatar: "SK", joinDate: "2024-01-08", address: "456 Park Ave, Brooklyn, NY 11201" },
  { id: "c3", name: "Michael Chen",    email: "mchen@example.com",     phone: "+1 (555) 456-7890", totalOrders: 8,  totalSpent: 189.20,  lastVisit: "2026-03-15", status: "active",   avatar: "MC", joinDate: "2025-07-22", address: "789 Oak Rd, Queens, NY 11101" },
  { id: "c4", name: "Emma Davis",      email: "emma@example.com",      phone: "+1 (555) 567-8901", totalOrders: 67, totalSpent: 3421.00, lastVisit: "2026-03-28", status: "active",   avatar: "ED", joinDate: "2023-11-14", address: "321 Elm St, Manhattan, NY 10002" },
  { id: "c5", name: "James Wilson",    email: "jwilson@example.com",   phone: "+1 (555) 678-9012", totalOrders: 3,  totalSpent: 54.70,   lastVisit: "2026-02-10", status: "inactive", avatar: "JW", joinDate: "2025-12-01", address: "654 Pine Ave, Bronx, NY 10451" },
  { id: "c6", name: "Olivia Brown",    email: "olivia@example.com",    phone: "+1 (555) 789-0123", totalOrders: 29, totalSpent: 876.40,  lastVisit: "2026-03-27", status: "active",   avatar: "OB", joinDate: "2024-03-19", address: "987 Maple Dr, Staten Island, NY 10301" },
  { id: "c7", name: "Daniel Lee",      email: "dlee@example.com",      phone: "+1 (555) 890-1234", totalOrders: 15, totalSpent: 342.60,  lastVisit: "2026-03-20", status: "active",   avatar: "DL", joinDate: "2024-09-05", address: "147 Cedar St, Jersey City, NJ 07302" },
  { id: "c8", name: "Sophia Martinez", email: "smartinez@example.com", phone: "+1 (555) 901-2345", totalOrders: 52, totalSpent: 2100.30, lastVisit: "2026-03-30", status: "active",   avatar: "SM", joinDate: "2023-08-17", address: "258 Birch Ln, Hoboken, NJ 07030" },
];

export const orders: Order[] = [
  { id: "ORD-001", customerId: "c2", customerName: "Sarah Kim",       items: [{ productId: "p1", name: "Iced Latte",        qty: 2, price: 4.99 }, { productId: "p5", name: "Croissant",         qty: 1, price: 3.29 }], total: 13.27, status: "completed", date: "2026-03-30T09:15:00Z", paymentMethod: "card" },
  { id: "ORD-002", customerId: "c8", customerName: "Sophia Martinez", items: [{ productId: "p9", name: "Wireless Earbuds",  qty: 1, price: 49.99 }],                                                                    total: 49.99, status: "completed", date: "2026-03-30T10:22:00Z", paymentMethod: "card" },
  { id: "ORD-003", customerId: "c4", customerName: "Emma Davis",      items: [{ productId: "p13", name: "Cotton T-Shirt",   qty: 3, price: 14.99 }, { productId: "p14", name: "Denim Jeans",      qty: 1, price: 39.99 }], total: 84.96, status: "pending", date: "2026-03-30T11:05:00Z", paymentMethod: "cash" },
  { id: "ORD-004", customerId: "c1", customerName: "Alex Johnson",    items: [{ productId: "p2", name: "Green Tea",         qty: 1, price: 3.49 }, { productId: "p6", name: "Blueberry Muffin",  qty: 2, price: 2.99 }], total: 9.47,  status: "completed", date: "2026-03-30T11:48:00Z", paymentMethod: "digital" },
  { id: "ORD-005", customerId: "c6", customerName: "Olivia Brown",    items: [{ productId: "p15", name: "Face Serum",       qty: 1, price: 29.99 }, { productId: "p16", name: "Lip Balm",         qty: 2, price: 4.99 }], total: 39.97, status: "completed", date: "2026-03-30T12:30:00Z", paymentMethod: "card" },
  { id: "ORD-006", customerId: "c3", customerName: "Michael Chen",    items: [{ productId: "p4", name: "Orange Juice",      qty: 2, price: 3.99 }, { productId: "p8", name: "Bagel with Cream",  qty: 1, price: 4.49 }], total: 12.47, status: "refunded",  date: "2026-03-29T14:10:00Z", paymentMethod: "card" },
  { id: "ORD-007", customerId: "c7", customerName: "Daniel Lee",      items: [{ productId: "p17", name: "Design Principles", qty: 1, price: 24.99 }],                                                                  total: 24.99, status: "completed", date: "2026-03-29T15:22:00Z", paymentMethod: "digital" },
  { id: "ORD-008", customerId: "c5", customerName: "James Wilson",    items: [{ productId: "p11", name: "USB Hub",           qty: 1, price: 24.99 }, { productId: "p10", name: "Phone Charger",   qty: 1, price: 19.99 }], total: 44.98, status: "cancelled", date: "2026-03-29T16:00:00Z", paymentMethod: "card" },
  { id: "ORD-009", customerId: "c2", customerName: "Sarah Kim",       items: [{ productId: "p1", name: "Iced Latte",         qty: 1, price: 4.99 }, { productId: "p5", name: "Croissant",         qty: 2, price: 3.29 }], total: 11.57, status: "completed", date: "2026-03-29T08:45:00Z", paymentMethod: "card" },
  { id: "ORD-010", customerId: "c4", customerName: "Emma Davis",      items: [{ productId: "p18", name: "JavaScript Guide",  qty: 1, price: 34.99 }],                                                                  total: 34.99, status: "completed", date: "2026-03-28T11:20:00Z", paymentMethod: "digital" },
];

export const salesData = [
  { day: "Mon", sales: 1240, orders: 32 },
  { day: "Tue", sales: 980,  orders: 27 },
  { day: "Wed", sales: 1540, orders: 41 },
  { day: "Thu", sales: 1120, orders: 29 },
  { day: "Fri", sales: 1890, orders: 54 },
  { day: "Sat", sales: 2340, orders: 67 },
  { day: "Sun", sales: 1780, orders: 48 },
];

export const monthlySales = [
  { month: "Oct", revenue: 18400 },
  { month: "Nov", revenue: 22100 },
  { month: "Dec", revenue: 31500 },
  { month: "Jan", revenue: 19800 },
  { month: "Feb", revenue: 23600 },
  { month: "Mar", revenue: 27900 },
];

export const categorySales = [
  { name: "Beverages",    value: 38, color: "#6366f1" },
  { name: "Food",         value: 24, color: "#22c55e" },
  { name: "Electronics",  value: 18, color: "#f59e0b" },
  { name: "Clothing",     value: 12, color: "#ef4444" },
  { name: "Other",        value: 8,  color: "#06b6d4" },
];

export const topProducts = [
  { name: "Iced Latte",        sold: 342, revenue: 1706.58, trend: "+12%" },
  { name: "Wireless Earbuds",  sold: 87,  revenue: 4349.13, trend: "+8%"  },
  { name: "Croissant",         sold: 215, revenue: 707.35,  trend: "+5%"  },
  { name: "Denim Jeans",       sold: 63,  revenue: 2519.37, trend: "-3%"  },
  { name: "Face Serum",        sold: 94,  revenue: 2819.06, trend: "+18%" },
];
