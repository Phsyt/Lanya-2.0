const fs = require('fs');

const dataFile = 'data.json';

// Function to load the user balances from the JSON file with error handling
function loadData() {
  try {
    // Read the file synchronously and specify utf8 encoding
    const data = fs.readFileSync(dataFile, 'utf8');
    // Try to parse the file content as JSON
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, is empty, or contains invalid JSON
    if (error.code === 'ENOENT') {
      // File does not exist, return an empty object for a fresh start
      console.log('data.json not found. Creating a new one.');
      return {};
    } else if (error instanceof SyntaxError) {
      // JSON is malformed, log an error and start fresh
      console.error('Error parsing JSON from data.json:', error.message);
      console.log('Corrupted data.json file detected. Starting with an empty balance object.');
      return {};
    } else {
      // Other unexpected errors
      console.error('An unknown error occurred while reading data.json:', error);
      return {};
    }
  }
}

// Function to save the user balances to the JSON file
function saveData(data) {
  try {
    // Stringify the data with pretty-printing and write it synchronously
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('An error occurred while saving data to data.json:', error);
  }
}

module.exports = { loadData, saveData };
