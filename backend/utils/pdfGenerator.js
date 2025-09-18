const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateFeeReceipt = async (feeData, studentData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const filename = `receipt_${feeData.receiptNumber}.pdf`;
      const filepath = path.join(process.env.UPLOAD_PATH, filename);
      
      doc.pipe(fs.createWriteStream(filepath));
      
      // Header
      doc.fontSize(20).text('CampusFlow College', 50, 50);
      doc.fontSize(16).text('Fee Payment Receipt', 50, 80);
      
      // Receipt details
      doc.fontSize(12)
         .text(`Receipt No: ${feeData.receiptNumber}`, 50, 120)
         .text(`Date: ${new Date(feeData.paymentDate).toLocaleDateString('en-IN')}`, 300, 120)
         .text(`Student Name: ${studentData.name}`, 50, 150)
         .text(`Student ID: ${studentData.studentId}`, 300, 150)
         .text(`Course: ${studentData.course}`, 50, 180)
         .text(`Fee Type: ${feeData.feeType}`, 50, 210)
         .text(`Amount: ₹${feeData.amount.toLocaleString('en-IN')}`, 50, 240)
         .text(`Payment Mode: ${feeData.paymentMode}`, 300, 240)
         .text(`Transaction ID: ${feeData.transactionId}`, 50, 270);
      
      // Footer
      doc.text('This is a computer generated receipt.', 50, 350);
      
      doc.end();
      
      doc.on('end', () => {
        resolve(filename);
      });
      
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateFeeReceipt };