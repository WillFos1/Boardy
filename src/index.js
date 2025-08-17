
require('dotenv').config(); // Load .env variables early
const { PrismaClient } = require('@prisma/client');
const app = require('./app');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Test DB connection
async function startServer() {
  try {
    await prisma.$connect(); // Ensures DB is reachable
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit on failure
  }
}

startServer();