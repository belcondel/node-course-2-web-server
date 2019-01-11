const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {

  var now = new Date().toString();
//  console.log(now);

  var log = now + req.method + req.url;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>
  {
      if (err)
      {
        console.log('Unable to write to the server log file');
      }
  });

next();
});



hbs.registerPartials(__dirname + '/views/partials');
console.log(__dirname);

hbs.registerHelper('getCurrentYear',() =>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));
app.get('/',(req,res) => {
    res.render('home.hbs',{
      pageTitle : 'HOME PAGE',
      welcomeText : 'This is a Sample Home page'
    })
})

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle : 'ABOUT PAGE',
    sampleText : 'This is a Sample About page'
  });
})

app.get('/maintainence', (req,res) => {
  res.render('maintainence.hbs',{
    pageTitle : 'Maintainence PAGE',
    maintainenceText : 'The page is under Construction'
  });
})
app.get('/Lucian', (req,res) => {
    res.send({
      'First Name' : 'Lucian',
      'Last Name' : 'Belconde',
      'Hobbies'    : ['CRICKET', 'FOOTBALL', 'FORMULA 1']
    });
})

app.get('/Zara', (req,res) => {
    res.send({
      'First Name' : 'Zara Josette',
      'Last Name' : 'Belconde',
      'Hobbies'    : ['CHU CHU TV', 'Infobells', 'Appa']
    });
})
app.listen(4000, () => {
  console.log('Server is up on port - 4000');
});
