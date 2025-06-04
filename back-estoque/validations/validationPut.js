import methodValidantionFieldsPost from '../method/validation.js'
import db from '../config/database.js'

class validationPutFields{
    async validation(form){
        try {
            const fields = await methodValidantionFieldsPost.ValidationFields(form)
            console.log('FIELDS')
            console.log(fields)
            if(fields.status){
                console.log('SALVAR BD')
                try {
                    const updated = await db.update({              
                        name: form.name,
                        price: form.price,
                        promotion: form.promotion,
                        price_promotion: form.price_promotion,
                        stock_quantity: form.stock_quantity,
                        category_id: form.category_id,
                    }).where({id: form.id}).table('products_product')
                    if(updated === 0){
                        return {
                            status: false, error: 'Produto não encontrado ou nenhum dado foi alterado.', code: 404,};
                    }
                    return {status: true, message: 'Produto atualizado com sucesso.', code: 200}
                } catch (error) {
                    console.log(err)
                    return {status: false, error: 'Houve um error no servidor. Tente novamente.', code: 500}
                }
            }else{
                return{status: fields.status, error: fields.error, code: 400}
            }
        } catch (error) {
            console.log(err)
            return {status: false, error: 'Houve um error no servidor. Tente novamente.', code: 500}
        }
    }
}

export default new validationPutFields()