const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));