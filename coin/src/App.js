import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [flipResult, setFlipResult] = useState('');
    const [history, setHistory] = useState([]);

      // Fetch flip history
        useEffect(() => {
            const fetchHistory = async () => {
                  try {
                          const response = await axios.get('https://accursed-spider-x5rprxq976wwh6vjp-5000.app.github.dev/api/coin/history');
                                  setHistory(response.data);
                                        } catch (error) {
                                                console.log('Error fetching history', error);
                                                      }
                                                          };

                                                              fetchHistory();
                                                                }, []);

                                                                  // Flip coin
                                                                    const flipCoin = async () => {
                                                                        try {
                                                                              const response = await axios.post('https://accursed-spider-x5rprxq976wwh6vjp-5000.app.github.dev/api/coin/flip');
                                                                                    setFlipResult(response.data.result);
                                                                                          setHistory([response.data, ...history]);
                                                                                              } catch (error) {
                                                                                                    console.log('Error flipping coin', error);
                                                                                                        }
                                                                                                          };

                                                                                                            return (
                                                                                                                <div>
                                                                                                                      <h1>Coin Flip App</h1>
                                                                                                                            <button onClick={flipCoin}>Flip Coin</button>
                                                                                                                                  <p>Result: {flipResult}</p>

                                                                                                                                        <h2>Flip History</h2>
                                                                                                                                              <ul>
                                                                                                                                                      {history.map((flip, index) => (
                                                                                                                                                                <li key={index}>{flip.result} - {new Date(flip.date).toLocaleString()}</li>
                                                                                                                                                                        ))}
                                                                                                                                                                              </ul>
                                                                                                                                                                                  </div>
                                                                                                                                                                                    );
                                                                                                                                                                                    };

                                                                                                                                                                                    export default App;