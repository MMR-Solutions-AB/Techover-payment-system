import fetch from 'node-fetch'

export async function getProduct(id) {
    const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products/${id}`)
    const data = await res.json()
    return data
}
