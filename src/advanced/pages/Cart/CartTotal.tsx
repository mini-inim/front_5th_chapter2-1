import React from "react";
import { ProductInfo, ProductOption } from "../Util/StockStatus";
import { Header } from "../Util/Header";
import { CartContainer } from "./CartContainer";
import { useState } from "react";
import { AddButton } from "../Util/ButtonAddToCart";
import { CartItemList } from "./CartItemList";

function CartTotal (){

    //현재 선택 중인 품목
    const [selectItemId, setSelectItemId] = useState('p1');

    //장바구니에 담아둔 품목 리스트
    const [cartItems, setCartItems] = useState([]);

    const handleProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectItemId(e.target.value);
    }

    return (
        <CartContainer>
            <Header/>
            <CartItemList items = {cartItems}/>
            <ProductOption
                selectItemId={selectItemId}
                onChange={handleProduct}/>
            <AddButton
                selectItemId={selectItemId} 
                cartItems={cartItems} 
                setCartItems={setCartItems}/>
            <ProductInfo/>
        </CartContainer>
    )
}

export {CartTotal};