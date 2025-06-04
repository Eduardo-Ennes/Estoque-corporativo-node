import db from '../config/database.js'


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
}

export default new ProductsMethods()