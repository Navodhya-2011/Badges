const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

const mongoURL = 'mongodb+srv://navodhya2011:Ru1rWzPdpjZSSKEd@cluster0.qjkyxuq.mongodb.net/mern';

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');

    // Define the schema for the form data
const formSchema = new mongoose.Schema({
    profession: String,
    country: String,
    firstName: String,
    lastName: String,
    email: String,
    NIC: String,
    phoneNo: String,
    address: String,
    gender: String,
    education: String
    });

    // Create the Form model based on the schema
    const Form = mongoose.model('Form', formSchema);

    // Middleware to parse JSON data
    app.use(express.json());
    app.use(cors());

    // API endpoint to submit the form data
    app.post('/api/submit-form', (req, res) => {
    const formData = req.body;

      // Create a new instance of the Form model
    const form = new Form(formData);

      // Save the form data to MongoDB
    form.save()
    .then(() => {
        console.log('Form data saved successfully');
        res.json({ success: true });
    })
    .catch((err) => {
        console.error('Error saving form data:', err);
        res.status(500).json({ error: 'An error occurred while saving the form data' });
        });
    });

    // Generate a PDF document based on the given text
async function generatePDF(text) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  page.drawText(text, { x: 50, y: 50 });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
    
    // API endpoint to generate and return a download link
app.post('/api/generate-pdf', (req, res) => {
  const { education, format } = req.body;

  if (format === 'PDF') {
    // Generate the PDF using the provided education data
    generatePDF(education)
      .then((pdfBytes) => {
        const fileName = 'document.pdf';
        const filePath = path.join(__dirname, fileName);

        // Write the PDF bytes to a file
        fs.writeFile(filePath, pdfBytes, (err) => {
          if (err) {
            console.error('Error writing PDF file:', err);
            res.status(500).json({ error: 'An error occurred while generating the PDF.' });
          } else {
            console.log('PDF file created:', fileName);

            // Send the download link back to the frontend
            const downloadLink = `http://localhost:3001/api/download-pdf?fileName=${fileName}`;
            res.json({ downloadLink });
          }
        });
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
        res.status(500).json({ error: 'An error occurred while generating the PDF.' });
      });
  } else if (format === 'Word') {
    generatePDF(education)
      .then((pdfBytes) => {
        const fileName = 'document.docx';
        const filePath = path.join(__dirname, fileName);

        // Write the PDF bytes to a file
        fs.writeFile(filePath, pdfBytes, (err) => {
          if (err) {
            console.error('Error writing Word file:', err);
            res.status(500).json({ error: 'An error occurred while generating the Word.' });
          } else {
            console.log('Word file created:', fileName);

            // Send the download link back to the frontend
            const downloadLink = `http://localhost:3001/api/download-word?fileName=${fileName}`;
            res.json({ downloadLink });
          }
        });
      })
      .catch((err) => {
        console.error('Error generating PDF:', err);
        res.status(500).json({ error: 'An error occurred while generating the Word.' });
      });
  } else {
    res.status(400).json({ error: 'Invalid format provided' });
    return;
  }
});

// API endpoint to download the generated PDF
app.get('/api/download-pdf', (req, res) => {
  const fileName = req.query.fileName;
  const filePath = path.join(__dirname, fileName);

  // Set the response headers for file download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// API endpoint to download the generated Word document
app.get('/api/download-word', (req, res) => {
  const fileName = req.query.fileName;
  const filePath = path.join(__dirname, fileName);

  // Set the response headers for file download
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Stream the file to the response
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
