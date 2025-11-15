const http = require("http");
const url = require("url");
const admin = require("firebase-admin");

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://warehouse-d9e26-default-rtdb.firebaseio.com"
});

const db = admin.database();

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  console.log(`\n${req.method} ${req.url}`);
  console.log(req.headers.origin);
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  try {
    // ==================== CAPACITY ENDPOINTS ====================
    
    // GET all capacity data
    if (pathname === "/api/capacity" && req.method === "GET") {
      console.log("Fetching capacity data...");
      const snapshot = await db.ref("capacity").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // GET single capacity by index
    else if (pathname.match(/^\/api\/capacity\/\d+$/) && req.method === "GET") {
      const index = pathname.split("/")[3];
      const snapshot = await db.ref(`capacity/${index}`).once("value");
      const data = snapshot.val();
      
      if (!data) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Capacity item not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data }));
    }
    
    // ==================== CATEGORIES ENDPOINTS ====================
    
    // GET all categories
    else if (pathname === "/api/categories" && req.method === "GET") {
      console.log("Fetching categories...");
      const snapshot = await db.ref("categories").once("value");
      const data = snapshot.val();
      console.log(data,"-----------");
      
      res.writeHead(200);
      res.end(JSON.stringify({
        data:data || []
      }));
    }
    
    // GET single category by index
    else if (pathname.match(/^\/api\/categories\/\d+$/) && req.method === "GET") {
      const index = pathname.split("/")[3];
      const snapshot = await db.ref(`categories/${index}`).once("value");
      const data = snapshot.val();
      
      if (!data) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Category not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data }));
    }
    
    // ==================== SUBCATEGORIES ENDPOINTS ====================
    
    // GET all subcategories
    else if (pathname === "/api/subcategories" && req.method === "GET") {
      console.log("Fetching subcategories...");
      const snapshot = await db.ref("subcategories").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // GET subcategories by category ID (query param)
    else if (pathname === "/api/subcategories/by-category" && req.method === "GET") {
      const categoryId = parseInt(parsedUrl.query.categoryId);
      
      if (!categoryId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "categoryId query parameter required" }));
        return;
      }
      
      const snapshot = await db.ref("subcategories").once("value");
      const data = snapshot.val() || [];
      
      const filtered = data.filter((sub) => sub.categoryId === categoryId);
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: filtered
      }));
    }
    
    // ==================== INVENTORY ENDPOINTS ====================
    
    // GET inventory by category (pie chart data)
    else if (pathname === "/api/inventory/by-category" && req.method === "GET") {
      console.log("Fetching inventory by category...");
      const snapshot = await db.ref("inventoryByCategory").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    // GET inventory list
    else if (pathname === "/api/inventory/list" && req.method === "GET") {
      const page = parseInt(parsedUrl.query.page) || 1; // Default page 1
      const itemsPerPage = parseInt(parsedUrl.query.itemsPerPage) || 5;
      console.log("Fetching inventory list...");
      const snapshot = await db.ref("inventoryList").once("value");
      const data = snapshot.val();

      if (!data) {
        res.writeHead(200);
        res.end(JSON.stringify({ 
          success: true,
          data: [],
          pagination: {
            currentPage: page,
            itemsPerPage: itemsPerPage,
            totalItems: 0,
            totalPages: 0,
            nextPage: 0,
            prevPage: 0,
          }
        }));
        return;
      }

      // Calculate pagination
      const totalItems = data.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      const paginatedData = data.slice(startIndex, endIndex);
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: paginatedData,
        pagination: {
          currentPage: page,
          itemsPerPage: itemsPerPage,
          totalItems: totalItems,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          nextPage: totalPages >= page + 1 ? page + 1 : null,
          prevPage: page - 1 > 0 ? page-1 : null,
        }
      }));
    }
    
    // GET single inventory item by index
    else if (pathname.match(/^\/api\/inventory\/list\/\d+$/) && req.method === "GET") {
      const index = pathname.split("/")[4];
      const snapshot = await db.ref(`inventoryList/${index}`).once("value");
      const data = snapshot.val();
      
      if (!data) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Inventory item not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data }));
    }

    // ==================== SUBCATEGORIES ENDPOINTS ====================

    // GET all subcategories
    else if (pathname === "/api/subcategories" && req.method === "GET") {
      console.log("Fetching all subcategories...");
      const snapshot = await db.ref("subcategories").once("value");
      const data = snapshot.val() || [];
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        count: data.length,
        data: data
      }));
    }

    // GET single subcategory by ID
    else if (pathname.match(/^\/api\/subCategories\/\d+$/) && req.method === "GET") {
      const subId = parseInt(pathname.split("/")[3]);
      console.log(`Fetching subcategory with ID ${subId}...`);
      
      const snapshot = await db.ref("subcategories").once("value");
      const allSubcategories = snapshot.val() || [];
      
      // Find subcategory by id field (not array index)
      const subcategory = allSubcategories.find((sub) => sub.id === subId);
      
      if (!subcategory) {
        res.writeHead(404);
        res.end(JSON.stringify({ 
          success: false,
          error: "Subcategory not found" 
        }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: subcategory
      }));
    }

    // GET subcategories by category ID from URL path
    else if (pathname.match(/^\/api\/categories\/\d+\/subCategories$/) && req.method === "GET") {
      const categoryId = parseInt(pathname.split("/")[3]);
      console.log(`Fetching subcategories for category ${categoryId}...`);
      
      const snapshot = await db.ref("subCategories").once("value");
      const allSubcategories = snapshot.val() || [];
      console.log(allSubcategories);
      // Filter subcategories by categoryId
      const filtered = allSubcategories.filter((sub) => sub.categoryId === categoryId);
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        categoryId: categoryId,
        count: filtered.length,
        data: filtered
      }));
    }
    
    // ==================== PRODUCTS ENDPOINTS ====================
    
    // GET all products
    else if (pathname === "/api/products" && req.method === "GET") {
      console.log("Fetching products...");
      const snapshot = await db.ref("products").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // GET single product by index
    else if (pathname.match(/^\/api\/products\/\d+$/) && req.method === "GET") {
      const index = pathname.split("/")[3];
      const snapshot = await db.ref(`products/${index}`).once("value");
      const data = snapshot.val();
      
      if (!data) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Product not found" }));
        return;
      }

      res.writeHead(200);
      res.end(JSON.stringify({ success: true, data }));
    }
    
    // ==================== LOCATIONS ENDPOINTS ====================
    
    // GET all locations
    else if (pathname === "/api/locations" && req.method === "GET") {
      console.log("Fetching locations...");
      const snapshot = await db.ref("locations").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // ==================== ORDERS ENDPOINTS ====================
    
    // GET recent orders
    else if (pathname === "/api/orders/recent" && req.method === "GET") {
      console.log("Fetching recent orders...");
      const snapshot = await db.ref("recentOrders").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // GET order trends by week
    else if (pathname === "/api/orders/trends" && req.method === "GET") {
      console.log("Fetching order trends...");
      const snapshot = await db.ref("orderTrendsByWeek").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // ==================== ACTIONS ENDPOINTS ====================
    
    // GET recent actions
    else if (pathname === "/api/actions/recent" && req.method === "GET") {
      console.log("Fetching recent actions...");
      const snapshot = await db.ref("recentActions").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || []
      }));
    }
    
    // GET monthly actions flow
    else if (pathname === "/api/actions/monthly-flow" && req.method === "GET") {
      console.log("Fetching monthly actions flow...");
      const snapshot = await db.ref("monthlyActionsFlow").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET all statuses
    else if (pathname === "/api/statuses" && req.method === "GET") {
      console.log("Fetching statuses...");
      const snapshot = await db.ref("statuses").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({
        data:data || [],
      }));
    }

    // ==================== STATISTICS ENDPOINTS ====================

    // GET all statistics
    
    else if (pathname === "/api/statistics" && req.method === "GET") {
      console.log("Fetching statistics...");
      const snapshot = await db.ref("statistics").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET monthly inventory flow
    else if (pathname === "/api/statistics/monthly-inventory-flow" && req.method === "GET") {
      console.log("Fetching monthly inventory flow...");
      const snapshot = await db.ref("monthlyInventoryFlow").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET stock alert chart data
    else if (pathname === "/api/statistics/stock-alerts" && req.method === "GET") {
      console.log("Fetching stock alert chart...");
      const snapshot = await db.ref("stockAlertChart").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // ==================== USER ENDPOINTS ====================
    
    // GET user profile
    else if (pathname === "/api/user/profile" && req.method === "GET") {
      console.log("Fetching user profile...");
      const snapshot = await db.ref("user/profile").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET user permissions
    else if (pathname === "/api/user/permissions" && req.method === "GET") {
      console.log("Fetching user permissions...");
      const snapshot = await db.ref("user/permissions").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET user settings
    else if (pathname === "/api/user/settings" && req.method === "GET") {
      console.log("Fetching user settings...");
      const snapshot = await db.ref("user/settings").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // GET complete user data
    else if (pathname === "/api/user" && req.method === "GET") {
      console.log("Fetching complete user data...");
      const snapshot = await db.ref("user").once("value");
      const data = snapshot.val();
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        data: data || {}
      }));
    }
    
    // ==================== HEALTH CHECK ====================
    
    // Simple test route
    else if (pathname === "/api/health" && req.method === "GET") {
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        message: "Server is running!",
        timestamp: new Date().toISOString()
      }));
    }
    
    // List all available endpoints
    else if (pathname === "/api" && req.method === "GET") {
      const endpoints = {
        capacity: [
          "GET /api/capacity",
          "GET /api/capacity/:index"
        ],
        categories: [
          "GET /api/categories",
          "GET /api/categories/:index"
        ],
        subcategories: [
          "GET /api/subcategories",
          "GET /api/subcategories/by-category?categoryId=:id"
        ],
        inventory: [
          "GET /api/inventory/by-category",
          "GET /api/inventory/list",
          "GET /api/inventory/list/:index"
        ],
        products: [
          "GET /api/products",
          "GET /api/products/:index"
        ],
        locations: [
          "GET /api/locations"
        ],
        orders: [
          "GET /api/orders/recent",
          "GET /api/orders/trends"
        ],
        actions: [
          "GET /api/actions/recent",
          "GET /api/actions/monthly-flow"
        ],
        statistics: [
          "GET /api/statistics",
          "GET /api/statistics/monthly-inventory-flow",
          "GET /api/statistics/stock-alerts"
        ],
        user: [
          "GET /api/user",
          "GET /api/user/profile",
          "GET /api/user/permissions",
          "GET /api/user/settings"
        ],
        system: [
          "GET /api/health",
          "GET /api"
        ]
      };
      
      res.writeHead(200);
      res.end(JSON.stringify({ 
        success: true,
        message: "Warehouse API",
        endpoints
      }));
    }
    
    // 404 - Route not found
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ 
        error: "Route not found",
        message: "Visit /api for a list of available endpoints"
      }));
    }
    
  } catch (error) {
    console.error("=== ERROR ===");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("=============");
    
    res.writeHead(500);
    res.end(JSON.stringify({ 
      error: "Internal server error", 
      details: error.message
    }));
  }
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║          Warehouse Backend Server Running              ║
╠════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                        ║
║  Health: http://localhost:${PORT}/api/health             ║
║  Docs:   http://localhost:${PORT}/api                    ║
╚════════════════════════════════════════════════════════╝
  `);
});