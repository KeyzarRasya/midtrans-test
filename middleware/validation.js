const { default: axios } = require("axios")
require("dotenv").config()


const checkStatus = (req, res, next) => {
    const {order_id} = req.query
    const url = `https://api.sandbox.midtrans.com/v2/${order_id}/status`
    const base64 = btoa(process.env.SERVER_KEY)
    axios.get(url, {
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Basic ${base64}`
        }
    }).then(response => {
        req.midtrans = response.data;
        console.log(req.midtrans)
        if(response.data.status_code === '200'){
            return next()
        }
        res.render("pending")
    }).catch(err => console.error(err))
}

module.exports = [checkStatus]