import axios from 'axios'

// Está classe é apenas para adicionar um produto ao carrinho
class OperationAddCard{
    async AddCard(pk, qtd){
        try{
            await this.Local_Storage()
            // Consultar o funcionamento da função Local_Storage()
            const stotage_card = localStorage.getItem('card') 
            const storage_price = localStorage.getItem('price')
            // localStorage.getItem -> serve para buscar as variáveis que desejamos no LocalStorage
            if(stotage_card != null && storage_price != null){
                const card = await JSON.parse(stotage_card)
                const price = await JSON.parse(storage_price)
                // JSON.parse -> método para converter strings para JSON
                const data = [card, price]
                console.log('CHEGOU AQUI')
                const response = await axios.put(`http://localhost:8000/card/${pk}/${qtd}`, data, {withCredentials: true})
                console.log(response.data.card)
                console.log(response.data.price['price'])
                // Usei o PUT, porque me meu entendimento o card já está criado, apenas irei altera-lo adicionando, atualizand ou deletando dados
                const response_set_storage = await this.set_Local_Storage(response.data.card, response.data.price['price'])
                return response_set_storage.message
            }else{
                return{message: 'Houve um error ao criar no LocalStorage!'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async set_Local_Storage(card, price){
        localStorage.setItem('card', JSON.stringify(card))
        localStorage.setItem('price', JSON.stringify({'price': price}))
        // localStorage.setItem -> serve tanto para criar ou atualizar uma variável no LocalStorage
        return{message: 'ok'}
    }

    async Local_Storage(){
        // Nesta função verificamos se o LocalStorage exite. Caso não exista, o criamos.
        const value_stotage_card = localStorage.getItem('card')
        const value_storage_price = localStorage.getItem('price')
        if(value_stotage_card != null && value_storage_price != null){
            return{message: 'Existe!'}
        }else{
            localStorage.setItem('card', JSON.stringify([]))
            localStorage.setItem('price', JSON.stringify({'price': 0}))
            // localStorage.setItem -> serve tanto para criar ou atualizar uma variável no LocalStorage
            return{message: 'Acbamos de criar!'}
        } 
    }
}

export default new OperationAddCard()