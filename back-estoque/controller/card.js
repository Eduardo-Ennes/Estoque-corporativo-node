import db from '../config/database.js'
import methodCard from '../validations/card/card.js'


class cardMethods{
    async put(req, res){
        const value = req.body[1]
        const card = req.body[0]
        const id = req.params.id
        try{
            const validation = await methodCard.addCard(id, card, value)
            if(validation.status){
                res.status(200).json({status: true, card: validation.data[0], price: validation.data[1]})
            }else{
                res.status(400).json({status: false, error: validation.error})
            }
        }catch(error){
            console.log(error)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }

    async delete(req, res){
        const value = req.body[1]
        const card = req.body[0]
        const id = req.params.id
        try{
            const validation = await methodCard.excludeProduct(id, card, value)
            if(validation.status){
                res.status(200).json({status: true, card: validation.data[0], price: validation.data[1]})
            }else{
                res.status(400).json({status: false, error: validation.error})
            }
        }catch(error){
            console.log(error)
            res.status(500).json({status: false, err: 'Houve um erro no servidor. Tente novamente.', code: 500})
        }
    }
}

export default new cardMethods()