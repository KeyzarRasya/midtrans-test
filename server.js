require('dotenv').config()
const express = require("express")
const midtransClient = require('midtrans-client')
const cors = require("cors")
const {v4:uuid}  = require("uuid")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static("views"))
app.set("view engine", "ejs")


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

app.listen(3000, () => {
    console.log("running")
})