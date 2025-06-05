import axios from 'axios'

// Esta é uma classe que contém um método que utiliza API para a criação de um objeto (produto).
class CreateForm{
    async Create(form){
        try{
            // Preferencialmente, sempre enviar formulários através do corpo da requisição para uma maior segurança
            const response = await axios.post('http://localhost:8000/products/', form, {withCredentials: true})
            return response.data
        }catch(error){
            console.log(error)
            return {
                error: error.response.data, 
                status: error.response.status
            }
        }
    }

    async VerifyType(form){
        
    }
}

export default new CreateForm()