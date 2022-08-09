import { createOrder, retrieveOrder } from './services/klarna.js'
import { getProduct } from './services/api.js'
import express from 'express'
const app = express()
import { config } from 'dotenv'
config()

app.get('/p/:product_id', async function (req, res) {
    try {
        const product_id = req.params.product_id
        const product = await getProduct(product_id)
        const klarnaJsonResponse = await createOrder([{ product, quantity: 1 }])
        const html_snippet = klarnaJsonResponse.html_snippet
        console.log('Order id: ', klarnaJsonResponse.order_id)
        res.send(html_snippet)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/confirmation', async function (req, res) {
    const order_id = req.query.order_id
    console.log('anka')
    console.log(order_id)
    const klarnaJsonResponse = await retrieveOrder(order_id)
    const html_snippet = klarnaJsonResponse.html_snippet
    res.send(html_snippet)
})

app.listen(3000)
