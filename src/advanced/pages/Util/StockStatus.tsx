import React from "react";
import { PRODUCTS } from "../../context/product";

function ProductOption({selectItemId, onChange}){
    return(
        <select 
            id="product-select" 
            className="border rounded p-2 mr-2"
            value = {selectItemId}
            onChange = {onChange}
        >
            {PRODUCTS.map((item) => (
                <option
                    key={item.id}
                    value={item.id}
                    disabled={item.stock === 0}
                >
                    {`${item.name} - ${item.price}원`}
                </option>
            ))}
        </select>
    )
}

function ProductInfo(){
    let infoMsg = '';

    PRODUCTS.forEach(function(item){
        if(item.stock < 5 ){
            infoMsg += `${item.name}: ${item.stock > 0 ? `재고 부족 (${item.stock}개 남음)` : '품절'} \n`;
        }
    });

    return (
        <div id="stock-status" className="text-sm text-gray-500 mt-2">
            {infoMsg}
        </div>
    )
}

export { ProductOption, ProductInfo };