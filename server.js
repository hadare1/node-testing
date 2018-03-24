const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// debugger;
app.use((req,res,next) =>  {

var time = new Date().toString();
var log = `${time}: ${req.method}  ${req.url}`
console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
  if (err) {
    console.log('Unable to append to server.log');
  }
});
next();
});

// app.use((req,res,next) => {

    // res.render('maintnance.hbs', {
      // pageTitle: 'maintnance page',
      // welcomeMessage:"Sorry for the inconvinient"
    // })

// });


app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage:"Welcome to Hadars Kingdom"
  })
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects page'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
});

app.get('/bad' ,(req,res) => {
  res.send({
    error:"Unable to reach url"
  })
});

app.listen(port, () => {
  console.log(`Servers runs on port ${port}`);
});
