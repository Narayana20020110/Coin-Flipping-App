const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const dbURI = 'mongodb+srv://Yagna:24581430@coin-flip.sydzu.mongodb.net/MyDB?retryWrites=true&w=majority&appName=coin-flip';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

    // Define Flip Schema and Model directly in server.js
    const flipSchema = new mongoose.Schema({
      result: {
          type: String,
              enum: ['Heads', 'Tails'],
                  required: true,
                    },
                      date: {
                          type: Date,
                              default: Date.now,
                                },
                                });

                                const Flip = mongoose.model('Flip', flipSchema);

                                // Define Routes directly
                                app.post('/api/coin/flip', async (req, res) => {
                                  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
                                    const flip = new Flip({ result });

                                      try {
                                          await flip.save();
                                              res.status(201).json(flip);
                                                } catch (error) {
                                                    res.status(500).json({ error: 'Failed to flip the coin' });
                                                      }
                                                      });

                                                      app.get('/api/coin/history', async (req, res) => {
                                                        try {
                                                            const flips = await Flip.find().sort({ date: -1 });
                                                                res.json(flips);
                                                                  } catch (error) {
                                                                      res.status(500).json({ error: 'Failed to fetch history' });
                                                                        }
                                                                        });

                                                                        // Start the server
                                                                        const port = process.env.PORT || 5000;
                                                                        app.listen(port,() => {
                                                                          console.log(`Server running no ${port}      `) ;
                                                                          });