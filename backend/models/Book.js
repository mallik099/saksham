const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: [String],
  publisher: { type: String, required: true },
  edition: String,
  publicationYear: Number,
  category: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  totalCopies: { type: Number, required: true },
  availableCopies: { type: Number, required: true },
  location: {
    shelf: String,
    rack: String,
    floor: String
  },
  price: { type: Number, required: true },
  language: { type: String, default: 'English' },
  description: String,
  coverImage: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);