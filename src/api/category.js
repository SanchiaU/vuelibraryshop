const categoryList = require("@/data/category.json")

const productList = require("@/data/product.json")

export function getCategoryList(){
    return categoryList
}

export function getProductList(){
    return productList
}