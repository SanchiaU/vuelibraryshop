const productList = require("@/data/cart.json")

export function getList() {
    return productList
}

export function add({title,price,image,quantity,size,amount}){
    let id =productList.length + 1
    let selected = false
    productList.push({id,title,price,image,quantity,amount,size,selected})
    console.log(productList.length)
}