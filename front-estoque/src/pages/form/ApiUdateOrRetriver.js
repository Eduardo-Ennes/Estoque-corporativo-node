import axios from 'axios'

/* 
Este código trás uma complexidade maior, tentarei ao máximo explicar de forma clara a forma de funcionamento. Para que se tenha um melhor entendimento sobre o código ter conhecimentos em localStorage e os métodos Put e Patch lhe dariam um melhor entendimento.
*/
class ApiRetriverUpdated{
    async ApiPutAndPatchUpdated(form_api, form_updated, pk){
        /* 
        form_api = ProductApi (Objeto usado para comparação)
        form_updated = Product
        pk = ID do objeto
        */
        const object_fields_is_equal = this.FormsIsEqual(form_api, form_updated)
        const object_fields_is_equal_length = Object.keys(object_fields_is_equal).length
        // Se o de length object_fields_is_equal_length for maior que 0, indica que houve alteração nos dados. Se não cairá no else, indicando que nenhum dado foi alterado

        if(object_fields_is_equal_length >= 0 && object_fields_is_equal_length < 6){
            const object_to_api = this.ObjectPutOrPatch(form_api, form_updated, 'patch')
            const object_to_api_legth = Object.keys(object_to_api).length
            // object_to_api_legth -> esta variável é o retorno do objeto dos campos que foram alterados, dependendo do número de campos usaremos o method Put ou Patch

            try{
                if(object_to_api_legth >= 1 && object_to_api_legth < 6){
                    // Se TODOS os campos do objeto NÃO foram alterados, usamos o method Patch, que no backend é Partial_Update
                    const response = await this.PatchUpdate(pk, object_to_api)
                    return response
            }
                if(object_to_api_legth === 6){
                    // Se todos os campos do objeto foram alterados, devemos usar o method Put, que no backend é Update
                    const response = await this.PutUpdate(pk, form_updated)
                    return response
            }
        }catch(error){
            console.log(error)
            return {message: 'Houve um error no servidor, tente novamente.', code: 500}
        }
        }
        else{
            console.log('Você não atualizou nenhum campo')
            return{error: {'Field': ['Você não atualizou nenhum campo']}}
        }
    }

    async Retriver(pk){
        // API responsável por buscar os dados do objeto 
        try{
            const response = await axios.get(`http://localhost:8000/product/detail/${pk}/`, {withCredentials: true})
            return {data: response.data.detail, categories: response.data.categories, status: 200}
        }catch(error){
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    async PutUpdate(id, form_updated){
        // API do method Put
        try{
            const response = await axios.put(`http://localhost:8000/product/${id}/`, form_updated, {withCredentials: true})
            return {status: response.data.status, message: response.data.message}
        }catch(error){
            console.log('----------------------')
            console.log(error.response.data.status)
            return {
                status: error.response.data.status,
                error: error.response.data.error
            };
        }
    }

    async PatchUpdate(id, form_updated){
        // API do method Patch
        try{
            const response = await axios.patch(`http://localhost:8000/product/${id}/`, form_updated, {withCredentials: true})
            return{status: true, message: response.data.message}
        }catch(error){
            if(error.response){
                return {
                    status: error.response.data.status,
                    error: error.response.data.error
                };
            }
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    FormsIsEqual(form_api, form_updated){
        /* Neste método verificamos se o objeto de comparação e o objeto que será enviado para atualização são iguais ou diferentes.

        Se houver modificação o dado é adicionado ao objeto object_fields_is_equal.
        */
        const object_fields_is_equal = {}
        for(const campo in form_updated){
            if(form_updated[campo] === form_api[campo]){
                object_fields_is_equal[campo] = form_api[campo]
            }
        }

        return object_fields_is_equal
    }

    ObjectPutOrPatch(form_api, form_updated){ 
        // Em breve irei trazer uma melhor explicação 
        const object_partial_fields = {}
        for(const key in form_updated){
            if(form_updated['promotion'] == true){
                if(form_updated[key] === form_api['promotion']){
                    object_partial_fields[key] = form_api[key]
                }
                else if(form_updated[key] === form_api['price']){
                    object_partial_fields[key] = Number.parseFloat(form_api['price'])
                }
                else if(form_updated[key] === form_api['price_promotion']){
                    object_partial_fields[key] = Number.parseFloat(form_api['price_promotion'])
                }
                else if(form_updated[key] != form_api[key]){
                    object_partial_fields[key] = form_updated[key]
                }
            }
            else{
                if(form_updated[key] != form_api[key]){
                    object_partial_fields[key] = form_updated[key]
                }
            }
        }

        return object_partial_fields
    }
}

export default new ApiRetriverUpdated()