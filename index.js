const express = require("express");
const postRoutes = require("./routes/postRoute");
const imageRoutes = require("./routes/imagesRouter");
const { getPool } = require("./config/dbConfig"); // Import getPool
const cors = require("cors"); // Import cors

const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(express.json());

app.use("/api/", postRoutes);
app.use("/api/images", imageRoutes);

app.use("/api/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, async () => {
  try {
    await getPool(); // Initialize the connection pool once on startup
    console.log("Server is running on http://localhost:" + PORT);
  } catch (error) {
    console.error("Failed to initialize the database connection:", error);
  }
});
