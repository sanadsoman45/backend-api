const path = require("path");
const multer = require("multer");
const { getPool } = require("../config/dbConfig"); // Import the MySQL pool

// Configure storage for images
const storage = multer.diskStorage({
  destination: "./uploads/images", // Store images in the `uploads/images` folder
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Use unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
}).single("image"); // Expect a single file with the key `image`

// Controller to upload an image and store it in the database
const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const pool = await getPool();
      // Insert the filename into the database and get the last inserted ID
      const [result] = await pool.query(
        "INSERT INTO Images (name) VALUES (?)",
        [req.file.filename]
      );

      // Get the ID of the newly inserted record
      const insertedId = result.insertId;

      res.status(200).json({
        message: "Image uploaded successfully",
        filename: req.file.filename,
        id: insertedId, // Include the ID of the new record in the response
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      res
        .status(500)
        .json({ error: "An error occurred while saving to the database" });
    }
  });
};

module.exports = { uploadImage };
