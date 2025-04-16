import { PRODUCTS } from "./context/product";
import { addCartItem, updateAddedItem, changeCartItem, removeCartItem } from "./events/item";


function setupItemEvent(){
    document.getElementById('add-to-cart')!.addEventListener('click', handleAddItem);
    document.getElementById('cart-items')?.addEventListener('click', handleClickCartItem);
}

function handleAddItem(){
    const productOption = document.getElementById('product-select') as HTMLSelectElement;
    const selItem = productOption.value;
    const itemToAdd = PRODUCTS.find(function (p) {
        return p.id === selItem;
    });

    console.log("itemToAdd: ", itemToAdd);
    const item = document.getElementById(itemToAdd.id);

    if(item){
        updateAddedItem(item, itemToAdd);
    } else {
        addCartItem(itemToAdd);
    }

    //잔여 item 개수 업데이트 함수 필요 
}


function handleClickCartItem(event){
    const tgt = event.target;
    
    const prodId = tgt.dataset.productId;
    const itemElem = document.getElementById(prodId);

    const prod = PRODUCTS.find(function (p) {
        return p.id === prodId;
    });

    if(tgt.classList.contains('quantity-change')) {
        changeCartItem(itemElem, tgt, prod);
    }

    if(tgt.classList.contains('remove-item')) {
        removeCartItem(itemElem, tgt);
    }

    //잔여 item 개수 업데이트 함수 필요
}

export {setupItemEvent};