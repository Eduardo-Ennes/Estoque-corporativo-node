import React from 'react' 
import Header from './pages/header/Header'
import Form_product_update from './pages/form/Form_product_update'
import Form_product_create from './pages/form/Form_product_create'
import List from './pages/list/List'
import Card from './pages/card/Card'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'

const App = () => {
    const [selectedId, setSelectedId] = useState(null)
    const [ReloadList, setReloadList] = useState(true)
    const changeReloadList = () => setReloadList(false)
    const ReloadListDelete = () => setReloadList(true)

    /* 
    selectedId -> está variável é o id do produto selecionado na lista, para qu possa atualizar ou deletar o produto. 

    ReloadList -> Variável que controla o estado para as funções get que buscam os dados através de API, Com ela não precisamos fazer um reaload na página quando um dado é craido, atualizado ou deletado.

    changeReloadList e ReloadListDelete -> Ambas as funções são responsáveis por mudar o estado da variável ReloadList, com isso, acionando a função get que busca os dados atualizados no banco de dados.
    
    ! No Form_product_update, quando atualizado o objeto, a função onClearId() é chamada para por o selectedId = null e o ReloadList = true. selectedId("usado para identificar o objeto que será atualizado.") e  ReloadList("Usamos apenas a sua mudança de estado para acionar o useEffect que aciona a API para buscar os dados da lista atualizados. Apenas a sua mudança de estado, true e false não interferem na lógica.").
    */

    const [Reloadcard, setReloadCard] = useState(false)
    const ChangeReloadCard = () => setReloadCard(false)
    /*
    Funciona de forma idêntica do código acima, porém, se aplica ao carrinho de compras.
    */
    
    return (
        <Router>
            <Routes>
        
                {/* Página principal ("/") com lógica condicional */}
                <Route path="/" element={
                    <div className='content'>
                        <div className='content-header'>
                        <Header />
                        </div>

                        <div className='content-form'>
                        {selectedId === null ? 
                            <Form_product_create onClearId={() => setReloadList(true)} />
                        :
                            <Form_product_update selectedId={selectedId} onClearId={() => {    
                            setSelectedId(null)
                            setReloadList(true)
                            }} />
                        }   
                        </div>

                        <div className='content-list'>
                        <List 
                            onSelectId={(id) => setSelectedId(id)} 
                            ReloadList={ReloadList} 
                            changeReloadList={changeReloadList}
                            ReloadListDelete={ReloadListDelete}
                            OnReloadCard={() => setReloadCard(true)}
                        />
                        </div>

                        <div className='content-card'>
                        <Card 
                            OnReloadCard={() => setReloadCard(true)}
                            ChangeReloadCard={ChangeReloadCard}
                            Reloadcard={Reloadcard}
                        />
                        </div>
                    </div>
                    } />
            </Routes>
        </Router>
    )
}

export default App