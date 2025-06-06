import bd from '../../config/database.js'

class validationInfoProducts{
    async Form(form){
        const validation = await this.ValidationFields(form)
            if(validation.status){
                const save = await this.SaveBd(form)
                if(save.status){
                    return{status: save.status, message: save.message, code: 200}
                }else{
                    return{status: false, error: save.error, code: 500}
                }
            }else{
                return{status: validation.status, error: validation.error, code: 400}
            }
        }

    async ValidationFields(form){
        if('name' in form){
            if(form.name.length > 75 || form.name.length <= 0){
                return{status: false, error: 'O nome não pode ser vazio e deve conter no máximo 75 caracteres.'}
            }
        }
        
        if('price' in form){
            if(form.price <= 0){
                return{status: false, error: 'O preço deve ser maior que 0.'}
            }
        }
        
        if('stock_quantity' in form){
            if(form.stock_quantity < 0){
                return{status: false, error: 'O número de estoque não pode ser menor que 0.'}
            }
        }
        
        if('price_promotion' in form){
            if(form.price_promotion < 0){
                return{status: false, error: 'O preço promocional deve ser maior ou igual a 0.'}
            }
        }
        
        if('promotion' in form){
            if(form.promotion){
                if(form.price_promotion >= form.price){
                    return{status: false, error: 'O preço promocional deve ser menor que o preço de mercado.'}
                }
                if(form.price_promotion <= 0){
                    return{status: false, error: 'O preço promocional deve ser maior que 0.'}
                }
            }
        }
        return {status: true}
    }

    async SaveBd(form){
        try{
            await bd('products_product').insert({
                name: form.name,
                price: form.price,
                promotion: form.promotion,
                price_promotion: form.price_promotion,
                stock_quantity: form.stock_quantity,
                category_id: form.category_id,
            });
            return{status: true, message: 'Produto cadastrado com sucesso.'}
        }catch(err){
            console.log(err)
            return{status: false, error: 'Houve um error no servidor.'}
        }
    }
}


export default new validationInfoProducts()