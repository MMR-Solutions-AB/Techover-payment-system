import { getProducts } from './services/api.js'
import express from 'express'
const app = express()
import { config } from 'dotenv'
config()

app.get('/', async (_, res) => {
    const products = await getProducts()

    // Känn dig fri att lägga till vilken styling som helst nedan
    const markup = products
        .map(
            (p) =>
                `<a style="display:block;color:black;border:solid black 2px;margin: 20px; padding:10px;" href="/p/${p._id}">
                    ${p.name} - ${p.price}kr
                </a>`
        )
        .join(' ')

    res.send(markup)
})

app.listen(3000)
