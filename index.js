require('dotenv').config()
const express = require("express")
const midtransClient = require('midtrans-client')
const cors = require("cors")
const path = require("path")
const {v4:uuid}  = require("uuid")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static("views"))
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));


let snap = new midtransClient.Snap({
    isProduction:false,
    serverKey:process.env.SERVER_KEY
})



app.post("/transaction", (req, res) => {
    const {price} = req.body;
    let parameter = {
        "transaction_details":{
            "order_id":uuid(),
            "gross_amount":price
        },
        "credit_card":{
            "secure":true
        },
        "customer_details":{
            "first_name":"Keyzar",
            "last_name":"Athallah",
            "email":"keyzar.r.athallah@gmail.com",
            "phone":"0895340320245"
        }
    }

    snap.createTransaction(parameter)
.then(transaction => {
    res.redirect(transaction.redirect_url)
}).catch(err => console.log(err))
})

app.get("/", (req, res)=> {
    res.render("home")
})

app.post("/status", (req, res) => {
    res.send(req)
})

app.get("/finish", (req, res) => {
    const {order_id, status_code, transaction_status} = req.query;
    console.log(req.query)
    res.send("You have finished transaction")
})

app.listen(3000,'0.0.0.0', () => {
    console.log("running")
})