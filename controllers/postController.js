const { mysql, getPool } = require("../config/dbConfig");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const pool = await getPool();

    // SQL query to get posts with their associated image URLs
    const query = `
      SELECT 
        p.*, 
        i.name AS imageName 
      FROM 
        Posts p 
      LEFT JOIN 
        Images i ON p.img_id = i.id

    `;

    const [rows] = await pool.query(query);

    // Return the posts with the associated image URLs
    res.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

// Add a new post
const addPost = async (req, res) => {
  const { title, description, score, img_id } = req.body;
  try {
    const pool = await getPool();
    await pool.query(
      `
      INSERT INTO Posts (title, publication_date, description, score, img_id)
      VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?)
    `,
      [title, description, score || 0, img_id || null]
    ); // Use placeholders and an array for parameters

    res.status(201).json({ message: "Post added successfully" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "An error occurred while adding the post" });
  }
};

// Change the score of a post
const scoreChange = async (req, res) => {
  const { id, score } = req.body;
  try {
    const pool = await getPool();
    await pool.query(
      `
      UPDATE Posts SET score = ? WHERE id = ?
    `,
      [score, id]
    ); // Use placeholders for parameters

    res.status(200).json({ message: "Post score updated successfully", score, id });
  } catch (error) {
    console.error("Error updating post score:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post score" });
  }
};

module.exports = { getPosts, addPost, scoreChange };
