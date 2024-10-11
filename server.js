const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
