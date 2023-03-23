const express = require("express");
const hostname = '0.0.0.0';
const bodyParser = require("body-parser")
const https = require("https")
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/" , function (req,res) {
  res.sendFile(__dirname + "/signUp.html")
})


app.post("/" , function (req,res) {

const firstName  = req.body.fname
const lastname  = req.body.lname
const email  = req.body.email

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastname
      }
    }
  ]
};

const jasonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/3626dfbab7";

const options = {
  method : "POST",
  auth : "Aymaan1:4bdd9806d7f162e44bc644ea0c7b5ac3-us21"
}

const request = https.request(url ,options, function (response) {

  if(response.statusCode ===200) {
    res.sendFile(__dirname + "/success.html")
  }
  else{
    res.sendFile(__dirname + "/faliure.html")
  }
response.on("data", function (data) {
  console.log(JSON.parse(data));
})
})

  request.write(jasonData);
  request.end();
});

app.post("/faliure" , function (req,res) {
  res.redirect("/");
})

app.listen(3000 ,  function () {
  console.log("Port IS Running In Port 3000");
})


//
// bb0ef0a7e8a76b2375571eb8255a9264-us21
//
// 3626dfbab7
