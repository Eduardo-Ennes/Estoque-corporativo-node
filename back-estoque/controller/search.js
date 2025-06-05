import db from '../config/database.js'

class searchMethod{
    async get(req, res){
        const id = req.params.id
        const name = req.params.name
        try {
            if(id == 0 && name == 'null'){
                const obj = await db.select().table('products_product')
                res.status(200).json({data: obj})
                return;
            }
            if(id != 0 && name != 'null'){
                const obj = await db('products_product')
                .where({category_id: id})
                .andWhere('name', 'like', `%${name}%`)
                res.status(200).json({data: obj})
                return;
            }
            if(id != 0){
                const obj = await db('products_product').where({category_id: id})
                res.status(200).json({data: obj})
                return;
            }
            if(name != 'null'){
                const obj = await db('products_product').where('name', 'like', `%${name}%`)
                res.status(200).json({data: obj})
                return;
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }
}

export default new searchMethod()