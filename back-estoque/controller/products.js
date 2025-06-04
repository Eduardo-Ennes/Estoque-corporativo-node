import db from '../config/database.js'
import method from '../method/validation.js'


class ProductsMethods {
    async get(req, res){
        try{    
            const data = await db.select().table('products_product')
            res.status(200).json({"data": data, code: 200})
        }catch(err){
            console.log(err)
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
            console.log(validation)
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
}

export default new ProductsMethods()