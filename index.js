import { createOrder, retrieveOrder } from './services/klarna.js'
import { getProduct, getProducts } from './services/api.js'
import express from 'express'
const app = express()
import { config } from 'dotenv'
config()

app.get('/', async (req, res) => {
    const products = await getProducts()
    const markup = products
        .map(
            (p) =>
                `<a style="display:block;color:red;border:solid red 2px;margin: 20px; padding:10px;" href="/p/${p._id}">
                    ${p.name} - ${p.price}kr
                </a>`
        )
        .join(' ')

    res.send(markup)
})

app.get('/p/:product_id', async function (req, res) {
    try {
        const product_id = req.params.product_id
        const product = await getProduct(product_id)
        const klarnaJsonResponse = await createOrder(product)
        const html_snippet = klarnaJsonResponse.html_snippet

        res.send(html_snippet)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/confirmation', async function (req, res) {
    const order_id = req.query.order_id
    const klarnaJsonResponse = await retrieveOrder(order_id)
    const html_snippet = klarnaJsonResponse.html_snippet

    res.send(html_snippet)
})

app.listen(3000)
