import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Contact from "../Contact";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    
    const {cart, totalAmount, paymentMethod, cash} = props;

    return (
      <div ref={ref} className="p-5" >

      <Contact />      
      <h4 style={{textAlign:"center"}} >Invoice</h4>
      <br />
      <br />
      <p>Invoice No: {uuidv4()}</p>
      <p>{Date()}</p>
      <p>payment method: {paymentMethod}</p>
      
      {paymentMethod == "cash" && 
      <div>
      <p>Cash paid: RM {cash}</p> 
      <p>Balance Change: RM {cash - totalAmount}</p></div>}

        <table className='table'>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {cart ? cart.map((cartProduct, key) => <tr key={key}>
                  <td>{cartProduct.id}</td>
                  <td>{cartProduct.name}</td>
                  <td>RM {cartProduct.price}</td>
                  <td>{cartProduct.quantity}</td>
                  <td>RM {cartProduct.totalAmount}</td>

                  </tr>) : ''}
                </tbody>
        </table>
        <h2 className='px-2' style={{textAlign:"right"}} >Total Amount: RM {totalAmount}</h2>
            

      </div>
    );
  });