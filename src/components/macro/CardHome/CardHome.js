import React, {useEffect, useState} from 'react'
import './Card.css'
import { Link, Redirect } from 'react-router-dom'

import useCart from '../../../hooks/useCart'


function CardHome(props) {
    const produto = props.produto || {}
    let precoParce = (parseFloat(produto.productPrice.value) / 12)
    precoParce = precoParce.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    let preco = (parseFloat(produto.productPrice.value))
    preco = preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    const {
        addToCart,
    } = useCart()

    const [addedToCart, setAddedToCart] = useState(false)
    

    const handleCart = () => {
        addToCart(produto).then(() => setAddedToCart(true))
    }
    
    

    return (
        <div className=" col-6 col-sm-6 col-md-3 col-xl-3 col-xll-3 produtoDesktop">
            <div className="card " style={{ width: '18rem' }}>
                <Link to={`/product/${produto.id}`}>
                    <img src={produto.image} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body ">
                    <h5 className="card-title tituloProduto">{produto.productName}</h5>
                    <div className="card-text precoProduto"> {preco}<div>Ou</div>
                    </div>
                    <div className="ou">12x DE  {precoParce} sem juros</div><p></p>
                    <button class={props.emEstoque ? 'btn-custom-default btn-default btn-principal home-btn' : 'btn-custom-default btn-default btn-indisponivel home-btn'} onClick={() => handleCart()} disabled={props.emEstoque ? false : true}>{props.emEstoque ? "Comprar" : "Indisponível"}</button>
                    {addedToCart === true
                                ? <Redirect to="/cart"/>
                                : ""}
                </div>
            </div>
        </div>
    )

}

export default CardHome
