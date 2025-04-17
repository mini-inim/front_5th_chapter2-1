import React from "react"
import { addCartItem } from "../../services/AddItem"
import { useState } from "react"

function AddButton({selectItemId, cartItems, setCartItems}){

    const handleClick = () => {
        addCartItem(selectItemId, cartItems, setCartItems);
    }

    return (
        <button id="add-to-cart"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleClick()}
        > 추가
        </button>
    )
}

export { AddButton }