const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/bmi', (req, res) => {
  res.render('form');
});

app.post('/bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height) / 100; 
  if(weight<=0 || height<=0){
    res.render('form', { error: 'Please enter positive values for weight and height.' });
  } else {
    const bmi = (weight / (height * height)).toFixed(2);
    res.render('result', { bmi });
  }
  const bmi = weight/(height*height);

});

let category='';
let color='';
if(bmi<18.5){
  category='Underweight';
  color='blue';
}else if(bmi>=18.5 && bmi<24.9){
  category='Normal weight';
  color='green';
}else if(bmi>=25 && bmi<29.9){
  category='Overweight';
  color='orange';
}else{
  category='Obese';
  color='red';
}
res.render('result', { bmi, category, color });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});