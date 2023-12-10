import express from 'express';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const uploadDirectory = '/var/www/cads-website-merrimack';

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
      const destinationPath = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, destinationPath);
    },
  }),
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('No file uploaded');
    }

    const remoteServerURL = '/var/www/cads-website-merrimack'; // Replace with your remote server URL

    const fileData = fs.readFileSync(file.path);

    const response = await axios.post(remoteServerURL, fileData, {
      headers: {
        'Content-Type': file.mimetype,
        // Add any other necessary headers for your server
      },
    });

    console.log('File uploaded to remote server:', response.data);
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('File Upload Error:', err.message);
    res.status(500).json({ error: 'File upload failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});