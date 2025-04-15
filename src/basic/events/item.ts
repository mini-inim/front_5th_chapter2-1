import { AMOUNT_OF_STOCKS, OUT_OF_STOCKS } from "../context/product";


//카트에 아이템을 추가/삭제하는 함수
function changeCartItem(itemElem, tgt, prod) {

    let selectSpan = itemElem.querySelector('span').textContent;

    const qtyChange = parseInt(tgt.dataset.change);
    const currentQty = parseInt(selectSpan.split(AMOUNT_OF_STOCKS)[1]);
    const newQty = currentQty + qtyChange;
    
    if(newQty > 0 && newQty <= prod.stock + currentQty) {
      selectSpan = selectSpan.split(AMOUNT_OF_STOCKS)[0] + AMOUNT_OF_STOCKS + newQty;
      prod.stock -= qtyChange;
    } else if(newQty <= 0) {
      itemElem.remove();
      prod.q -= qtyChange;
    } else {
      alert(OUT_OF_STOCKS);
    }
}


//카트에 담은 아이템을 완전히 삭제하는 함수
function removeCartItem(itemElem, prod){
    const remQty = parseInt(itemElem.querySelector('span').textContent.split(AMOUNT_OF_STOCKS)[1]);
    
    prod.stock += remQty;
    itemElem.remove();
}

export { changeCartItem, removeCartItem };