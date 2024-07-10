const productList = require('@/data/product.json')


const warpList = [
    require('@/assets/swapper/num1.png'),
    require('@/assets/swapper/num2.png'),
    require('@/assets/swapper/num3.png')
]

export function getProductList() {
    return productList
}

export function getWarpList() {
    return warpList
}