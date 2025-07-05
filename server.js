const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000 ;

app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON

// In-memory array to store books
let books = [];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const { id, title, author } = req.body;
    if (!id || !title || !author) {
        return res.status(400).json({ message: 'id, title, and author are required' });
    }
    books.push({ id, title, author });
    res.status(201).json({ message: 'Book added', book: { id, title, author } });
});

// PUT to update a book by ID
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author } = req.body;
    const book = books.find(b => b.id == bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    if (title) book.title = title;
    if (author) book.author = author;
    res.json({ message: 'Book updated', book });
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(b => b.id == bookId);
    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
