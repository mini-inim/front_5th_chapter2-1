import React from "react";
import { ProductInfo, ProductOption } from "../Util/StockStatus";
import { Header } from "../Util/Header";
import { CartContainer } from "./CartContainer";
import { useState } from "react";
import { AddButton } from "../Util/ButtonAddToCart";

function CartTotal (){

    const [selectItemId, setSelectItemId] = useState('p1');

    const handleProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectItemId(e.target.value);
    }

    return (
        <CartContainer>
            <Header/>
            <ProductOption
                selectItemId={selectItemId}
                onChange={handleProduct}/>
            <AddButton/>
            <ProductInfo/>
        </CartContainer>
    )
}

export {CartTotal};