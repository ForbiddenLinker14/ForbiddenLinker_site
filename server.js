// Import necessary module
const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file upload
const upload = multer();

// Replace this with your MongoDB Atlas connection string
const mongoUri =
  "mongodb+srv://anitsaha976:zuzFOFhJY5EYscLA@cluster0.6nmeso4.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for your files
const fileSchema = new mongoose.Schema({
  filename: String,
  content: Buffer,
});
const File = mongoose.model("File", fileSchema);

// Define a schema and model for users
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Serve static files from the root directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html")); // Replace "index.html" with your main HTML file
});

// Handle file uploads
app.post("/upload", upload.array("files"), async (req, res) => {
  const uploadedFiles = req.files;

  if (uploadedFiles.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const savedFiles = await Promise.all(
      uploadedFiles.map(async (file) => {
        const newFile = new File({
          filename: file.originalname,
          content: file.buffer,
        });
        await newFile.save();
        return newFile;
      })
    );

    res.status(200).send("Files uploaded successfully.");
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("An error occurred while uploading the files.");
  }
});

app.get("/download/latest", async (req, res) => {
  try {
    const latestFile = await File.findOne().sort({ _id: -1 }).exec();
    if (!latestFile) {
      return res.status(404).send("No files available for download.");
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${latestFile.filename}`
    );
    res.send(latestFile.content);
  } catch (error) {
    console.error("Error downloading latest file:", error);
    res
      .status(500)
      .send("An error occurred while downloading the latest file.");
  }
});

// Add default user if not already in the database
async function addDefaultUser() {
  const existingUser = await User.findOne({
    username: "anit123",
    password: "zxcv",
  });

  if (!existingUser) {
    const newUser = new User({
      username: "anit123",
      password: "zxcv",
    });

    try {
      await newUser.save();
      console.log("Default user added to the User collection.");
    } catch (error) {
      console.error("Error adding default user:", error);
    }
  }
}

addDefaultUser();

app.use(express.static(__dirname));
app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).send("Login successful. Upload button is now visible.");
    } else {
      res.status(401).send("Invalid credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
