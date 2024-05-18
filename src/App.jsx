import React, { useState, useEffect, useRef } from "react";
import foodMenu from "./menu";
import Card from "./card";
import Header from "./header";
import toastOption from "./toastOption";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from "./components/ComponentToPrint";
import { useReactToPrint } from 'react-to-print';
import Footer from "./Footer";

function App() {

  const [isActive, setActive] = useState(false);
  const [count, setCount] = useState(1);
  const [selection, setSelection] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cash, setCash] = useState(0);

  const addProductToCart = (product) => {
    //check if the product exist in cart
    let findProductInCart = cart.find(i=>{
      return i.id === product.id
    })

    //if cart have product
    if(findProductInCart){
      
      let newCart = [];
      let newItem;
      
      cart.forEach(cartItem => {
        //if the item added exist in cart
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + count,
            totalAmount: cartItem.price * (cartItem.quantity + count),
          }
          newCart.push(newItem);
        } else {
          //if the item added doesn't exist in cart
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      setActive(!isActive);
      toast(`Added ${count} pcs ${newItem.name} to cart`, toastOption);
      setCount(1);
      
    } else {
      //if cart are empty
      let addingProduct = {
        ...product,
        quantity:count,
        totalAmount:(product.price)*(count),
      }
      setCart([...cart, addingProduct]);
      setActive(!isActive);
      toast(`Added ${count} pcs ${product.name} to cart`, toastOption);
      setCount(1);
    }

  }

  const removeProduct = async(product) => {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const closeWindow = () => {
    setActive(!isActive);
    setCount(1);
  }

  useEffect(() => {
    //refresh the total amount
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  }, [cart]);


  const addProduct = (x) => {
    setSelection(x);
    setActive(!isActive);
  }

  
  function Counter() {
  
    function increase() {
      setCount(count + 1);
    }
  
    function decrease() {
      if (count > 0){
      setCount(count - 1);}
    }
  
    return <div className="d-flex">
        <button className="qtyBtn" onClick={decrease}>-</button>
        <h1 className="qtyNum"  >{count}</h1>
        <button className="qtyBtn" onClick={increase}>+</button>
      </div>
  }

  function Window() {
    return <div className={isActive ? null: "hidden"} >

      <div className="window">
        <h1> {selection.name} </h1>
        <p>
          {selection.description}
        </p>
        <Counter />
        {count >= 1? 
        <button className="btn btn-primary" onClick={() => addProductToCart(selection)}>Confirm</button> : 
        <button className="btn btn-danger" onClick={() => closeWindow()}>cancel</button> }
        
        
      </div>
      <div className="overlay"></div>
    </div>
  }


  function CreateCard(x){
    return <div key={x.id}>
      <Card
        id={x.id}
        name={x.name}
        description={x.description}
        img={x.img}
        price={x.price}
      />
      <button onClick={() => addProduct(x)} className="btn btn-primary button col-lg-4"><img className="cartIcon" src="/Menu-photo/cart-plus.svg" alt="add item" /> Add to cart</button>
      </div>
  }

const componentRef = useRef();

const handleReactToPrint = useReactToPrint({
  content: () => componentRef.current,
});

const handlePrint = () => {
  if (paymentMethod == "cash" && (cash < totalAmount)){
    alert("Please pay sufficient cash");
  } else {
    handleReactToPrint();
  }
  
}

const handleOnchange = (event) => {
  let cashAmount = event.target.value;
  setCash(cashAmount);
}

const handleCardPayment = () => {
  setPaymentMethod('card');
  setCash('NIL');
}

return ( <div>

  <Header />

  <div >
    <Window />
  </div>
  

  <div className="row" >
    <div className='col-md-6 col-lg-8'>
      <div className="menu">
        {foodMenu.map(CreateCard)}
      </div>
    </div>

    <div className='col-md-6 col-lg-4 bill'>
      <div style={{display:"none"}}>
        <ComponentToPrint 
        cart={cart} 
        totalAmount={totalAmount}
        paymentMethod={paymentMethod}
        cash={cash} 
        ref={componentRef} />
      </div>
      <div className='table-responsive bg-dark'>
        <table className='table table-responsive table-dark table-hover'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Qty</td>
              <td>Total</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {cart ? cart.map((cartProduct, key) => <tr key={key}>
              <td>{cartProduct.id}</td>
              <td>{cartProduct.name}</td>
              <td>RM {cartProduct.price}</td>
              <td>{cartProduct.quantity}</td>
              <td>RM {cartProduct.totalAmount}</td>
              <td>
                <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
              </td>
            </tr>) : 'No Item in Cart'}
          </tbody>
        </table>
        <h2 className='px-2 text-white'>Total Amount: RM {totalAmount}</h2>
        <br />

        <form className='px-2 pb-2 text-white'>
          <p className="payment" >Payment method :</p>
          <input type="radio" id="card" name="payment method" value="card" onClick={handleCardPayment} />
          <label  htmlFor="card">Card</label><br />
          <input type="radio" id="cash" name="payment method" value="cash" onClick={()=>setPaymentMethod('cash')} />
          <label htmlFor="cash">Cash </label> 
          { (paymentMethod == "cash") && (<div>RM: <input type="number" min={0} onChange={handleOnchange} /></div>)} 
          
          <br />
        </form>
      
      </div>

      <div className='mt-1'>
        { totalAmount !== 0 && paymentMethod ? 
          <div>
            <button className='btn btn-primary' onClick={handlePrint} >
              Pay Now
            </button>
            <button className='btn btn-warning' onClick={()=>setCart([])} >
              Clear Cart
            </button>
          </div>: 'Please add a product to the cart and select payment method'
        }
      </div>
    </div>



  </div>
  
  <Footer />
  <ToastContainer />
  </div>
)}

export default App
