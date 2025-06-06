import React, { useState, useEffect } from 'react';
import ApiUpdated from './ApiUdateOrRetriver'
import "../../app.css"

function Form_product_update({selectedId, onClearId}) {
  const [Categorys, setCategorys] = useState([])
  // Categories -> esta variável conterá os dados vindos da API para serem exibidos.
  const [Product, setProduct] = useState({
    'name': '',
    'price': 0,
    'promotion': false,
    'price_promotion': 0,
    'stock_quantity': 0,
    'category_id': 1,
  })
  const [ProductApi, setProductApi] = useState({
    'name': '',
    'price': 0,
    'promotion': false,
    'price_promotion': 0,
    'stock_quantity': 0,
    'category_id': 1,
  })

  /* Product -> Objeto que será usado tanto para exibir os dados vindo da API quanto será o objeto para atualização do objeto

  ProductApi -> Este objeto apenas armazenará os dados do objeto vindo da API, será muito importante para a lógica de comparação para o uso dos métodos Put e Patch.
  Explicação quando chamamos o método: ApiPutAndPatchUpdated
  */

  useEffect(() => {
    const RetriverApi = async (pk) => {
      if(pk !== null && Number.isInteger(pk) && pk !== undefined){
        const response = await ApiUpdated.Retriver(pk)
        if(response.status === 200){
          setProductApi({
            'name': response.data.name,
            'price': response.data.price,
            'promotion': response.data.promotion,
            'price_promotion': response.data.price_promotion,
            'stock_quantity': response.data.stock_quantity,
            'category_id': response.data.category_id,
          })
          setProduct({
            'name': response.data.name,
            'price': response.data.price,
            'promotion': response.data.promotion,
            'price_promotion': response.data.price_promotion,
            'stock_quantity': response.data.stock_quantity,
            'category_id': response.data.category_id,
          })
          setCategorys(response.categories)
        }
      }
    }
  
    RetriverApi(selectedId)
  }, [selectedId])
  

  const handleSubmitUpdated = async (event) => {
    try{
      event.preventDefault()
      const response = await ApiUpdated.ApiPutAndPatchUpdated(ProductApi, Product, selectedId)
      // Consultar ApiPutAndPatchUpdated para melhor entendimento
      console.log(response)
      if (response.status == false){
        alert(response.error)
        return;
      }
      alert(response.message) 
      onClearId() // Ativa a função para reload da lista
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <form className="form_update" onSubmit={handleSubmitUpdated}>
          <div className="div_form_update_contein_1">
            <input
            type="text"
            name="name"
            value={Product.name || 'Nada'}
            onChange={(e) => setProduct({...Product, name: e.target.value})}/>

            <input
            type="number"
            name="price"
            value={Product.price}
            onChange={(e) => setProduct({...Product, price: Number.parseFloat(e.target.value)})}/>

            <label htmlFor=""> 
            Produto em Promoção?
              <input
              type="checkbox"
              name="promotion"
              checked={Product.promotion}
              onChange={(e) => setProduct({...Product, promotion: e.target.checked})}
              id="promotion"
              />
              
            </label>
          </div>

          <div className="div_form_update_contein_2">
            <input 
            type="number" 
            name="price_promotion"
            value={Product.price_promotion}
            onChange={(e) => setProduct({...Product, price_promotion: Number.parseFloat(e.target.value)})}/>

            <input 
            type="number" 
            name="quantity"
            value={Product.stock_quantity}
            onChange={(e) => setProduct({...Product, stock_quantity: Number.parseFloat(e.target.value)})}/>

            <label htmlFor="">
              Categoria?
              <select 
              value={Product.category_id}
              onChange={(e) => setProduct({...Product, category_id: Number.parseFloat(e.target.value)})}
              > 
                {Categorys.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))} 
              </select>
            </label>
          </div>
          
          <div className="div_form_update_contein_buttons">
            <button type="submit">Atualizar</button>
            <button type="button" onClick={() => onClearId()}>Voltar</button>
          </div>
        </form>
    </>
  )
}

export default Form_product_update