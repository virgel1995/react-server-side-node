const express = require('express');

const app = express();
//landing page = https://localhost:3000/
app.get('/', (req, res) => {
	res.render('index');
});
