//including bot files 
require("./bot/bot.js");

//--------------- for dashboard
const express = require('express');
const reactViews = require('express-react-views');

const app = express();
try {
 
app.use('/public', express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());



const guild_routes = require('./routes/guild.js')
app.use('/api/guild', guild_routes)





  
} catch (e){
  console.log(e)
}

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})
