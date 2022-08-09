const express = require('express')
const app = express()
const { createOrder, retrieveOrder } = require('./services/klarna')

const products = [
    {
        type: 'physical', // same
        reference: 1,
        name: 'product1',
        quantity: 1,
        quantity_unit: 'pcs', // same
        unit_price: parseInt(499) * 100,
        tax_rate: 2500, // same
        total_discount_amount: 0, // same
        image_url:
            'https://www.elgiganten.se/image/dv_web_D180001002800471/234558/iphone-12-5g-smartphone-128-gb-vit--pdp_zoom-3000--pdp_main-960.jpg',
    },
    {
        type: 'physical', // same
        reference: 2,
        name: 'product2',
        quantity: 1,
        quantity_unit: 'pcs', // same
        unit_price: parseInt(555) * 100,
        tax_rate: 2500, // same
        total_discount_amount: 0, // same
        image_url:
            'https://www.elgiganten.se/image/dv_web_D180001002800471/234558/iphone-12-5g-smartphone-128-gb-vit--pdp_zoom-3000--pdp_main-960.jpg',
    },
]

app.get('/p/:product_id', async function (req, res, next) {
    try {
        const product_id = req.params.product_id
        const product = products.find((item) => item.id === product_id)
        const klarnaJsonResponse = await createOrder([{ product, quantity: 1 }])
        const html_snippet = klarnaJsonResponse.html_snippet
        console.log('Order id: ', klarnaJsonResponse.order_id)
        res.send(html_snippet)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/confirmation', async function (req, res, next) {
    const order_id = req.query.order_id
    console.log('anka')
    console.log(order_id)
    const klarnaJsonResponse = await retrieveOrder(order_id)
    const html_snippet = klarnaJsonResponse.html_snippet
    res.send(html_snippet)
})

app.listen(3000)
