import React from 'react';
import { useActions, useAppState } from "../../hooks"
import { AddToCart } from "../add-to-cart"
import "./style.css"

function Sepetim() {
    const state = useAppState()
    const { getCartCount, getTotalPrice, removeItemFromCart } = useActions()
    
    const renderItem = (item) => {
        return (
          <div key={item.id} className="cart-item">
            <img src={item.image_url} />
            <div>
              <p>{item.name}</p>
              <p>Fiyat: {item.price.toFixed(2)}</p>
              <AddToCart
                item={item}
              />
            </div>
            <div className="remove-cart">
              <button onClick={() => removeItemFromCart(item)} type="button" className="btn-close"></button>
            </div>
          </div>
        )
      }



return(
    <>
    
    <div className="sepetim" >
        {Object.keys(state.cart).map(x => renderItem(state.cart[x]))}
    </div>

   <div className="cart-footer mt-5">
       <label>Toplam Ürün Adedi: {getCartCount()} | Toplam Fiyat: {getTotalPrice()} TL</label>
   </div>

  </>
)


    }

export default Sepetim;
