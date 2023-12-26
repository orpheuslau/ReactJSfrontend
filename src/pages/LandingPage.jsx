import React, { useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { Auth } from '../components/Auth';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from'react-router-dom';



//import JwtMiddleware from './JwtMiddleware';


function LandingPage() {




  const [products, setProducts] = useState([]);
  const [isLoading, setISloading] = useState(false);
  const [isAuth, setISauth] = useState (false);
  const [cart, setCart] = useState([]);
  //const [username, setUsername] = useState('');
  const [totalAmount, setTotalAmount] = useState([0]);
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }
  const navigate = useNavigate(); 
  const username = localStorage.getItem('username');
  

  


  const fetchProducts = async () => {
try{
  
  const result = await axios.get('api/products')
    setProducts(await result.data);

    setISloading(false);
    //setISauth(true)
}
catch{
  navigate('/login')
     //setISauth(false)
     //console.log(isAuth);

  }
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
      toast(`Added  ${newItem.name} to cart`, toastOptions)
    }
    else {
      let addingProduct = {
        ...product,
        'quantity': 1, //this is a test
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added  ${product.name} to cart`)
    }
  }

  const removeProduct = async (product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id)
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handlePrint = () => {
    handleReactToPrint();
  }


  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    let newtotalAmount = 0;
    cart.forEach(icart => {
      newtotalAmount = newtotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newtotalAmount)
  }, [cart]);



  /**
   * Renders the POS page UI with product list, cart, 
   * and checkout button.
   * 
   * Fetches list of products on mount.
   * Allows adding/removing products to cart.
   * Calculates total cart amount.
   * Allows printing cart on checkout.
   * 
   * Usage:
   * <POSPage />
  */

  const c1 = 2;
  const c2 = 2;

  return (

<MainLayout>
      <div className='row'>
        <div className='col-lg-8'>
            <div className="h6 d-flex justify-content-end"><p>User name:  {username}  </p>
            </div>
       
              <div className='row bg-light'>

              <div className='pos-item col col-md-3 text-center' onClick={() => addProductToCart(products)}> 
        <p></p>
        <img src='https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png' className="img-fluid w-50" alt="Responsive image"/>
    <p>Master file</p>
          </div>

          <div className='pos-item col col-md-3  text-center' onClick={() => addProductToCart(products)}>
        <p></p>
        <img src='https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png' className="img-fluid w-50" alt="Responsive image"/>
    <p>Master file</p>
          </div>


          <div className='pos-item col col-md-3 text-center' onClick={() => addProductToCart(products)}>
        <p></p>
        <img src='https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png' className="img-fluid w-50" alt="Responsive image"/>
    <p>Master file</p>
          </div>

          <div className='pos-item col col-md-3  text-center' onClick={() => addProductToCart(products)}>
        <p></p>
        <img src='https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png' className="img-fluid w-50" alt="Responsive image"/>
    <p>Master file</p>
          </div>
   
    </div>
   
      </div>


      <div className='col-9'>
      <div class="row justify-content-left">
      
    <div class="col-3 m-3 pos-item text-center bg-info">
    <p></p>
        <img src='https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png' className="img-fluid w-50" alt="Responsive image"/>
      <p>Master file</p>
    </div>
    <div class="col-3 m-3 border">
      One of two columns
    </div>
    <div class="col-3 m-3 border">
      One of two columns
    </div>
  </div>
</div>
      </div>




    </MainLayout>
  )
}

export default LandingPage;
