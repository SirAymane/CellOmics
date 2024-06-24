// products.js
const express = require('express');
const mysql = require('mysql');
const db = require('../db/db'); // Export database connection


// Create a new router for product routes
const router = express.Router();


// Middleware to handle JSON payloads
router.use(express.json());

// GET all products with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query('SELECT * FROM products LIMIT ?, ?', [offset, limit], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching products');
      return;
    }

    db.query('SELECT COUNT(*) AS totalItems FROM products', (err, countResult) => {
      if (err) {
        res.status(500).send('Error fetching total items');
        return;
      }

      const totalItems = countResult[0].totalItems;
      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        products: results,
        totalItems,
        currentPage: page,
        totalPages
      });
    });
  });
});

// GET a single product by ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching product');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// POST a new product
router.post('/', (req, res) => {
  const newProduct = req.body;
  db.query('INSERT INTO products SET ?', [newProduct], (err, result) => {
    if (err) {
      res.status(500).send('Error saving the product');
      return;
    }
    res.status(201).json({ id: result.insertId, ...newProduct });
  });
});

// PUT to update a product by ID
router.put('/:id', (req, res) => {
  const productId = req.params.id;
  const productUpdates = req.body;
  db.query('UPDATE products SET ? WHERE id = ?', [productUpdates, productId], (err) => {
    if (err) {
      res.status(500).send('Error updating the product');
      return;
    }
    res.status(200).json({ id: productId, ...productUpdates });
  });
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  const productId = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [productId], (err) => {
    if (err) {
      res.status(500).send('Error deleting the product');
      return;
    }
    res.status(204).send();
  });
});

module.exports = router;
