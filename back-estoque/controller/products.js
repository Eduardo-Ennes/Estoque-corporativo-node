import db from '../config/database.js'
import method from '../method/validation.js'
import methodPut from '../validations/validationPut.js'
import methodPatch from '../validations/products/validationPatch.js'
import jwt from 'jsonwebtoken'


class ProductsMethods {
    async get(req, res){
        try {
            if(!req.cookies.token){
                const token = jwt.sign({ autorizacao: true }, process.env.SECRET_KEY)
                res.cookie('token', token, {
                    httpOnly: true,       // ⚠️ essencial: o JS do navegador não consegue ler esse cookie
                    secure: false,     // ⚠️ só será enviado via HTTPS
                    sameSite: 'lax' | 'none',   // ⚠️ só aceita cookies da mesma origem
                    })
            }
            const data = await db.select().table('products_product')
            res.status(200).json({"data": data, code: 200})
        } catch (error) {
            console.log(error)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    async post(req, res){
        try{
            const info = {
                'name': req.body.name,
                'price': req.body.price,
                'promotion': req.body.promotion,
                'price_promotion': req.body.price_promotion,
                'stock_quantity': req.body.stock_quantity,
                'category_id': req.body.category_id,
            }
            const validation = await method.Form(info)
            if(validation.status){
                res.status(validation.code).json({status: validation.status, message: validation.message})
            }else{
                res.status(validation.code).json({status: validation.status, error: validation.error})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }  
    }

    async delete(req, res){
        try{
            await db.delete().where({id: req.params.id}).table('products_product')
            res.status(200).json({status: true, message: 'Produto deletado com sucesso', code: 200})
        }catch(err){
            console.log(err)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    async getDetail(req, res){
        try{
            const detail = await db.select().where({id: req.params.id}).first().table('products_product')
            const category = await db.select().table('products_category')
            res.status(200).json({status: true, detail: detail, categories: category, code: 200})
        }catch(error){
            console.log(error)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    async put(req, res){
        try{
            const info = {
                'id': req.params.id,               
                'name': req.body.name,
                'price': req.body.price,
                'promotion': req.body.promotion,
                'price_promotion': req.body.price_promotion,
                'stock_quantity': req.body.stock_quantity,
                'category_id': req.body.category_id,
            }
            const validation = await methodPut.validation(info)
            if (validation.status){
                res.status(validation.code).json({status: validation.status, message: validation.message})
            }else{
                res.status(validation.code).json({status: validation.status, error: validation.error})
            }
            
        }catch(err){
            console.log(err)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    async patch(req, res){
        try{
            const fields = ['name', 'price', 'promotion', 'price_promotion', 'stock_quantity', 'category_id'];
            const info = { id: req.params.id };

            for(const field of fields){
                if(field in req.body){
                    info[field] = req.body[field]
                }
            }
            const validation = await methodPatch.validation(info)
            if (validation.status){
                res.status(validation.code).json({status: validation.status, message: validation.message})
            }else{
                res.status(validation.code).json({status: validation.status, error: validation.error})
            }
        }catch(err){
            console.log(err)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }
}

export default new ProductsMethods()