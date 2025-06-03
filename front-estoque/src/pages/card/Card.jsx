import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import ApiCard from '../list/ApiAddCard'
import ApiLowercard from './ApiLowerCard'
import '../../app.css'

function Card({ChangeReloadCard, OnReloadCard, Reloadcard}) {

  const [Card, setCard] = useState([])
  const [Price, setPrice] = useState()
  /*
  Card = Lista que conterá os produtos adicionados ao carrinho
  Price = Preço total 
  */

  useEffect(() => {
    const GetCard = async() => {
      const card_storage = localStorage.getItem('card')
      const price_storage = localStorage.getItem('price')
      if(card_storage != null && price_storage != null){
        const card = JSON.parse(card_storage)
        const price = JSON.parse(price_storage)
        setCard(card)
        setPrice(price['price'])
        await ChangeReloadCard()
      }
    }
    GetCard()
  }, [Reloadcard])

  const handleCard = async (event, pk, qtd=1) => {
    // Função para adicionar um item ao carrinho
      try{
        event.preventDefault()
        const response = await ApiCard.AddCard(pk)
        OnReloadCard()
      }catch(error){
        console.log(error)
      }
    } 

  const handleLowerCard = async (event, pk) => {
    // Função para diminuir ou deletar um item do carrinho
    try{
      event.preventDefault()
      const response = await ApiLowercard.LowerCard(pk)
      OnReloadCard()
    }catch(error){
      console.log(error)
    }
  }


  return (
    <>
      {Card.length > 0 ? (
        <div className='div-card'>
          <div className='div-card-contein'>
            {Card.map(product => (
              <React.Fragment key={product.id}>
                <p key={product.id} className='div-card-contein-p-name' title={product.name}>{product.name}</p>

                <div className='div-card-contein-spanqtd-and-price'>
                  <span className='span-card-qtd'>
                    
                    <Link onClick={(e) => handleLowerCard(e, product.id)} className='Link-span-qtd'>-</Link>
                  
                  <p>{product.quantity}</p>
                  
                  <Link onClick={(e) => handleCard(e, product.id)} className='Link-span-qtd'>+</Link></span>
                  {product.promotion ? 
                    <p className='div-card-contein-price'>R${(product.price_promotion * product.quantity).toFixed(2).replace('.', ',')}</p>
                  :
                    <p className='div-card-contein-price'>R${(product.price * product.quantity).toFixed(2).replace('.', ',')}</p>
                  }
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ):(
        <div className='div-card'>
          <h1 className='H1-title-card-payments-empty'>Carrinho vazio!</h1>
        </div>
      )}
      
      <div className='div-card-payments'>
        <span className='div-card-span-payments'>
          <p>Total:</p>
          {Price ? 
            <p>R${(Price).toFixed(2).replace('.', ',')}</p>
          :
            <p>R$00,00</p>
          }
          
        </span>
        <Link className='Link-card-payments'>Fechar Pedido</Link>
      </div>
    </>
  )
}

export default Card