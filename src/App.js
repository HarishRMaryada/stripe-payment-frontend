import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckOut from "react-stripe-checkout"

function App() {
  const [product,setProduct] = useState({
    name:"test stripe first time",
    price :10,
    productBy:"HRM C"
  })

  const makePayment = token =>{
    const body = {
      token,
      product
    }
    const headers ={
      "Content-Type":"application/json"
    }

    return fetch(`http://localhost:8080/payment`,{
      method:"POST",
      headers,
      body:JSON.stringify(body)
    }).then(response =>{

      console.log("RESPONSE",response)

    })
    .catch(err => console.log(err))

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckOut
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        name="Buy test product"
        amount={product.price * 100}
        >
          <button className="btn-large blue">
            Buy Product for {product.price}
          </button>
        </StripeCheckOut>
      </header>
    </div>
  );
}

export default App;
