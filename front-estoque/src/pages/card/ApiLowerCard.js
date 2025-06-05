import axios from 'axios'

// Esta classe é para diminuir a quantidade ou deletar um produto do carrinho
class OperationLowerCard{
    async LowerCard(pk){
        try{
            const storage_card = localStorage.getItem('card') 
            const storage_price = localStorage.getItem('price') 
            // Neste caso podemos buscar os campos no LocalStorage sem verificações, por que eles já estaram criados. Para que se possa usar os metodos de atualização e deleção dos dos produtos no carrnho, ele sempre passará primeiro pelo método de adicionar ao carrinho, onde obrigatoriamente é criado os campos 
            if(storage_card != null && storage_price != null){
                const card = await JSON.parse(storage_card)
                const price = await JSON.parse(storage_price)
                // JSON.parse -> método para converter strings para JSON
                const data = [card, price]
                const response = await axios.put(`http://localhost:8000/lowerproduct/${pk}`, data)
                // console.log(response.data.card)
                // console.log(response.data.price['price'])
                const response_set_storage = await this.set_Lower_Local_Storage(response.data.card, response.data.price['price'])
                return response_set_storage.message
            }else{
                return{message: 'Houve um error ao criar no LocalStorage!'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async set_Lower_Local_Storage(card, price){
        // Se todos os produtos forem deletados do carrinho, a variável card será uma lista vazia "[]", Este será o valor que será atualizado para a variável no LocalStorage e o price consequentemente igual a 0
        localStorage.setItem('card', JSON.stringify(card))
        localStorage.setItem('price', JSON.stringify({'price': price}))
        // localStorage.setItem -> serve tanto para criar ou atualizar uma variável no LocalStorage
        return{message: 'ok'}
    }
}

export default new OperationLowerCard()