import React, { useEffect, useState } from 'react'
import ApiGet from './ApiGet'
import ApiCard from './ApiAddCard'
import axios from 'axios'
import '../../app.css'

function List({onSelectId, ReloadList, changeReloadList, ReloadListDelete, OnReloadCard}) {

  const [Products, setProducts] = useState([])
  const [Categories, setCategories] = useState([])
  const [IdCategory, setIdCategory] = useState(0)
  const [NameSearch, setNameSearch] = useState('')
  /*
  Products -> lsita com todos os produtos para serem exibidos
  Categories -> lista com todas as categorias para serem exibidas
  IdCategory -> Id ou Pk da respectiva categoria
  NameSearch -> campo de string para busca de um produto
  */ 

  useEffect(() => {
    const FetchApiGet = async () => {
      // API que busca todos os produtos 
      try{
        const response = await ApiGet.getProducts()
        setProducts(response)
        changeReloadList()
      }catch(err){
        console.log(err)
      }
    }
    FetchApiGet()
  }, [ReloadList])

  useEffect(() => {
    const ApiGetCategories = async () => {
      // API que busca todas as categorias
      try{
        const response = await axios.get('http://localhost:8000/returncategories/')
        setCategories(response.data.categories)
      }catch(err){
        console.log(err)
      }
    }
    ApiGetCategories()
  }, [])

  const handleSubmitUpdate = (event, id) => {
    // Função que quando acionada passa o ID de um produto como parametro para a função onSelectId(id), que servepara selecionar um produto para atualização ou deleção 
    try{
      onSelectId(id)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (event, id) => {
    // Função que quando acionada irá deletar um produto
    try{
      event.preventDefault()
      const confirmation = confirm("Tem certeza que deseja excluir este produto?")
      // confirm -> É uma mensagem de confirmação, uso como forma de segurança antes de o usuário deletar um objeto de forma definitiva, pode ser muito útil caso o usuário tenha clicado em deletar de forma acidental.
      if(confirmation === false){
        return;
      }
      const response = await axios.delete(`http://localhost:8000/products/${id}/`)
      alert(response.data.message)
      ReloadListDelete() // Ativa a função para reload da lista
    }catch(error){
      console.log(error)
    }
  }

  const handleCard = async (event, pk, qtd=1) => {
    // Função para adicionar um item aocarrinho
    try{
      event.preventDefault()
      const response = await ApiCard.AddCard(pk, qtd)
      console.log(response)
      OnReloadCard() // Ativa a função para reload do card
    }catch(error){
      console.log(error)
    }
  } 

  const handleSearch = async(event, id, name) => {
    // API utilizada para retornar o resultado do SEARCH
    try{
      event.preventDefault()
      if(name === '' || name === ' '){
        alert('O campo de busca não pode ser enviado em branco!')
        return;
      }
      const response = await axios.get(`http://localhost:8000/search/${id}/${name}/`)
      setProducts(response.data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <nav className='nav-search'>
        <select 
        name="select" 
        className='select'
        value={IdCategory}
        onChange={(e) => (setIdCategory(e.target.value))}>
          {Categories.map(categories => (
            <option key={categories.id} value={categories.id}>{categories.name}</option>
          ))}
        </select>

        <div className='div-search-position'>
          <input 
          type="text" 
          className='search' 
          placeholder='Buscar produto'
          value={NameSearch}
          onChange={(e) => setNameSearch(e.target.value)}/>
          
          <button 
          type='button' 
          className='button_icon-search'
          onClick={(e) => handleSearch(e, IdCategory, NameSearch.trim())}><span className="material-icons">search</span></button>
        </div>
      </nav>
      

      <div className='div-table-position-fixed'>
        {Products.length > 0 ? (
          <table className='table'>
            <thead className='thead-list-fixed'>
              <tr className='tr-table'>
                <th className='list-th-size-name'>Nome do produto</th>
                <th>preço</th>
                <th>Pro</th>
                <th>Preço.P</th>
                <th>Categoria</th>
                <th>Qtd</th>
                <th>Ação</th>
              </tr>
            </thead>

            <tbody>
              {Products.map(product => (
                <tr key={product.id} className='tr-table'>
                    <td title={product.name} className='list-td-name-product'>{product.name}</td>
                    <td>R${product.price}</td>
                    <td className='td-position-promotion'>{product.promotion? 'Sim' : 'Não'}</td> 
                    <td>R${product.price_promotion}</td>
                    <td>{product.category.name}</td>
                    <td>{product.stock_quantity}</td>
                    <td className='td-position-button'>
                      <button onClick={(e) => handleSubmitUpdate(e, product.id)}>&#128221;</button>
                      <button type='button' onClick={(e) => handleDelete(e, product.id)}>&#10060;</button>
                      <button type='button' onClick={(e) => handleCard(e, product.id)}>&#128722;</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        ):(
          <h1 className='H1-title-list-empty'>Produto Não encontrado!</h1>
        )}
      </div>
    </>
  )
}

export default List