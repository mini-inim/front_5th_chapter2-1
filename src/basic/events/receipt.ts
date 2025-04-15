import { Discount } from "../component/Discount";
import { AMOUNT_OF_STOCKS, DISCOUNTS, PRODUCTS } from "../context/product";

let totalAmount = 0;
let itemCount = 0;


//가격 계산 함수
function updateReceipt() {
    const cartItems = document.getElementById(`cart-items`).children;
    let totalPrice = 0;


    //기본 계산 함수 처리
    for (let i=0; i < cartItems.length; i++) {
      (function () {
        let currentItem;

        for (let j=0; j < PRODUCTS.length; j++) {
          if(PRODUCTS[j].id === cartItems[i].id) {
            currentItem = PRODUCTS[j];
            break;
          }
        }

        const qty =parseInt(cartItems[i].querySelector('span').textContent.split(AMOUNT_OF_STOCKS)[1]);
        const totalItem = currentItem.val * qty;
        const discount = discountPrice(currentItem.id, qty);

        itemCount += qty;
        totalPrice += totalItem;
        totalAmount += totalItem * (1 - discount);
      })();
    }

    let discountRate=0;

    //대량 구매 할인
    if(itemCount >= 30) {
      const bulkDiscount = totalAmount * 0.25;
      const itemDiscount = totalPrice - totalAmount;

      if(bulkDiscount > itemDiscount) {
        totalAmount = itemDiscount * (1 - 0.25);
        discountRate = 0.25;
      } else {
        discountRate = (totalPrice - totalAmount) / totalPrice;
      }
    } else {
      discountRate = (totalPrice - totalAmount) / totalPrice;
    }


    //화요일 특별 할인
    if(new Date().getDay() === 2) {
      totalAmount *= (1 - 0.1);
      discountRate = Math.max(discountRate, 0.1);
    }


    const totalCart = document.getElementById('cart-total');
    totalCart.textContent = `총액: ${Math.round(totalAmount)}원`;


    //할인 경우
    if(discountRate > 0) {
      totalCart?.appendChild(Discount(discountRate));
    }


    //재고 함수 실시간 렌더링 
    updateStockInfo();
    
    //적립금 함수 실행
    renderBonusPts();
  }
  

function discountPrice(id, qty){
  if(qty < 10 ){
    return 0;
  }

  return DISCOUNTS[id] || 0;
}

export { updateReceipt };