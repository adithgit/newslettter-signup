const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const path = require('path')
const app = express();


app.use(bodyParser({ urlencoded: 'true' }));

//Homepage 

app.get('/', (req, res) => {
    const signupPath = path.resolve(__dirname, "signup.html");
    res.sendFile(signupPath);
})

//Mailchimp URL & options to be used inside https request 

const URL = 'https://us20.api.mailchimp.com/3.0/lists/af338bae2b/members'
const options = {
    method: 'POST',
    auth: 'key:159e872d992a80079f0ea7d1ac5b5adf-us20',
    header: {
        'content-type': 'application/json'
    }
}


//Post request -> Sending data to Mailchimp via https request 

app.post('/', (req, res) => {

    //Input data given by the user

    const firstName = req.body.firstName;
    const secondName = req.body.lastName;
    const email = req.body.email;

    // Data to be sent

    const dataToSend = {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": secondName
        }
    };
    var jsonData = JSON.stringify(dataToSend);
    
    const request = https.request(URL, options, (response) => {
        
        if (response.statusCode === 200) {
            const successPath = path.resolve(__dirname, 'success.html');
            res.sendFile(successPath);
        }else {
            const failurePath = path.resolve(__dirname, 'failure.html');
            res.sendFile(failurePath);
        }

        response.on("data", (d) => {
            console.log(JSON.parse(d));
        })

        response.on('end', () => {
            console.log("API request finished");
        })
    })


    request.write(jsonData);
    request.end();
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})