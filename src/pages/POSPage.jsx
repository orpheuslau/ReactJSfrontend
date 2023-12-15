import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react'
import axios from "axios"


function POSPage() {

  const [products, setProducts] = useState([]);
  const [isLoading, setISloading] = useState(false);
  const [cart, setCart] = useState([]);


  const fetchProducts = async () => {
    const result = await axios.get('products')
    setProducts(await result.data);
    setISloading(false);
  }

  const addProductToCart = async (product) => {
    //check if exist
    let findProductInCart = await cart.find(i => {
      return i.id === product.id
    });

    if (findProductInCart) {
      //
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
    }
    else {
      let addingProduct = {
        ...product,
        'quantity': 1, //this is a test
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <MainLayout>
      <div className='row'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row' >
            {products.map((products, key) =>
              <div key={key} className='col-lg-4'>
                <div className='border' onClick={() => addProductToCart(products)}>
                  <p>{products.name}</p>
                  <img src={products.image} className="img-fluid" alt={products.name} />
                  <p>${products.price}</p>
                </div>
              </div>
            )}
          </div>}
        </div>
        <div className='col-lg-4'>
          <div className='table-reponsive bg-dark'>
            <table className="table table-reponsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total amount</td>
                  <td>Action</td>

                </tr>
              </thead>
              <tbody>
                {cart ? cart.map((cartProduct, key) => <tr>
                  <td>{cartProduct.id}</td>
                  <td>{cartProduct.name}</td>
                  <td>{cartProduct.price}</td>
                  <td>{cartProduct.quantity}</td>
                  <td>{cartProduct.totalAmount}</td>
                  <td>
                    <button className='btn btn-danger btn-sm'>Remove</button>
                  </td>


                </tr>)
                  : 'No item in Cart'}
              </tbody>
            </table>
          </div>



        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage