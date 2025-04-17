import React from "react";
import { CartItem } from "./CartItem/CartItems";

const CartItemList = ({items, onChangeItem, onRemoveItem}) =>  {
    return (
        <div id="cart-items">
            {items.map((item) => (
                <CartItem
                key={item.id}
                item={item}
                qty={item.qty}
                onChangeItem={onChangeItem}
                onRemoveItem={onRemoveItem}
                />
            ))}
        </div>
    )

}

export { CartItemList };