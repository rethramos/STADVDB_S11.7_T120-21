const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require('express-handlebars');

require('dotenv').config();

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// ROUTES
require('./routes/_index').forEach(route => require(`./routes/${route}`)(app));

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
