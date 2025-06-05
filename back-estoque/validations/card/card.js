import db from '../../config/database.js'

class operationsCard{
    async addCard(id, card, value){
        try{
            const obj = await db.select().where({id: id}).table('products_product').first()
            if(obj){
                var incard = card.find(product => product.id == id);
                if(incard){
                    if(obj.stock_quantity == incard.quantity){
                        return{status: false, error: `Pedimos desculpas! este produto possui apenas ${obj.stock_quantity} em estoque, você já adicionou ${incard.quantity}.`}
                    }
                    if(incard.promotion){
                        incard['quantity'] += 1
                        value.price += incard['price_promotion']
                        return{status: true, data: [card, value]}
                    }else{
                        incard['quantity'] += 1
                        value.price += incard['price']
                        return{status: true, data: [card, value]}
                    }
                }else{
                    const obj_add = {
                        id: Number.parseInt(id),
                        name: obj.name,
                        price: Number.parseFloat(obj.price),
                        promotion: Boolean(obj.promotion),
                        price_promotion: Number.parseFloat(obj.price_promotion),
                        quantity: 1,
                    }

                    card.push(obj_add)

                    if(obj.promotion){
                        value.price += Number.parseFloat(obj.price_promotion)
                        return{status: true, data: [card, value]}
                    }

                    value.price += Number.parseFloat(obj.price)
                    return{status: true, data: [card, value]}
                }
            }else{
                return{status: false, error: 'Produto não encontrado. Tente novamente.', code: 400}
            }
        }catch(err){
            console.log(err)
            return{status: false, error: 'Houve um erro no servidor. Tente novamente.', code: 500}
        }
    }

    async excludeProduct(id, card, value){
        var incard = card.find(product => product.id == id)
        if(incard){
            if(incard.quantity == 1){
                var new_card = card.filter(product => product.id != id)
                if(incard.promotion){
                    value.price -= incard['price_promotion']
                    return{status: true, data: [new_card, value]}
                }else{
                    value.price -= incard['price']
                    return{status: true, data: [new_card, value]}
                }
            }else{
                if(incard.promotion){
                    value.price -= incard['price_promotion']
                    incard['quantity'] -= 1
                    return{status: true, data: [card, value]} 
                }else{
                    value.price -= incard['price']
                    incard['quantity'] -= 1
                    return{status: true, data: [card, value]}
                }
            }
        }else{
            return{status: false, error: 'Produto não encontrado no carrinho.'}
        }
    }
}

export default new operationsCard()