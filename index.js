const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();
// var mailChimp = 'https://us19.admin.mailchimp.com/159e872d992a80079f0ea7d1ac5b5adf-us20'; 

app.use(bodyParser({urlencoded:'true'}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post('/',(req,res)=>{
    var firstName = req.body.firstName;
    var secondNamr = req.body.secondName;
    var email = req.body.email
    console.log(email);
    res.send("Data recorded")
})

app.listen(3000,()=>{
    console.log('Listening on 3000');
})


//Audience ID
// af338bae2b

//API KEy
// 159e872d992a80079f0ea7d1ac5b5adf-us20