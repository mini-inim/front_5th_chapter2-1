import { product } from "../context/product";

//물품 추가 함수
function updateProduct() {
    sel.innerHTML='';
    prodList.forEach(function (item) {
      var opt=document.createElement('option');
      opt.value=item.id;
      opt.textContent=item.name + ' - ' + item.val + '원';
      if(item.q === 0) opt.disabled=true;
      sel.appendChild(opt);
    });
  }
  
//잔여 재고 확인 함수
function updateStock() {
    var infoMsg='';
    prodList.forEach(function (item) {
        if(item.q < 5) {infoMsg += item.name + ': ' + (item.q > 0 ? '재고 부족 ('+item.q+'개 남음)' : '품절') + '\n';
        }
    });
    stockInfo.textContent=infoMsg;
}

export {updateProduct, updateStock};