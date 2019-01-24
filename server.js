const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.use ((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}  ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err)=>{
    console.log("Coudln't append");
  });
  next();
});


// app.use((req,res,next)=> {
//   res.render('maintenance.hbs');
// });


app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear', () => {
  return `Year ${new Date().getFullYear()}`;
});


app.get('/', (req,res) => {
  res.render('home.hbs',{
    pageHeader : 'Welcome Home Page ',
    message : 'Yor are gonna to enjoy this'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageHeader : 'ABout this Web application'
  });
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'The bad request'
  });
});
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
