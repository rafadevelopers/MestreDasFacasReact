import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductList from '../../components/micro/ProductList/ProductList';

function Home(props) {


    const [products, setProducts] = useState([])
    const [qtyCart, setQtyCart] = useState(0)

    useEffect(() => {
        getProducts()
        setQtyCart(JSON.parse(localStorage.getItem('qtyCart')))
    }, [])

    const getProducts = () => {
        axios.get('http://localhost:8080/product').then((response) => {
            setProducts(response.data)
        })
    }

    const postProducts = () =>{

        axios.post('http://localhost:8080/itemrequest').then((response) => {
            setProducts(response.data)
        })

    }







    return(
        <>
        <h1>Home</h1>
        <h2>{qtyCart}</h2>
        <ProductList products={products} setQtyCart={setQtyCart} postProducts={setProducts}/>
        <Link to='/cart'>Ver Carrinho</Link>
        </>
    )
}

export default Home