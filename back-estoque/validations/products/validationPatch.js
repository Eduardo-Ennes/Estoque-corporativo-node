import db from '../../config/database.js'
import methodValidantionFieldsPost from '../../method/validation.js'

class validationPatchFields{
    async validation(form){
        try{
            const fields = await methodValidantionFieldsPost.ValidationFields(form)
            if(fields.status){
                try{
                    await db.update(form).where({id: form.id}).table('products_product')
                    return{status: true, message: 'Produto atualizado com sucesso.', code: 200}
                }catch(err){
                    console.log(err)
                    return {status: false, error: 'Houve um error no servidor. Tente novamente.', code: 500}
                }
            }else{
                return{status: fields.status, error: fields.error, code: 400}
            }
        }catch(err){
            console.log(err)
            return {status: false, error: 'Houve um error no servidor. Tente novamente.', code: 500}
        }
    }
}

export default new validationPatchFields()