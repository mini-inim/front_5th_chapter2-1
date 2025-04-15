var prodList, sel, addBtn, cartDisp, sum, stockInfo;
var lastSel, bonusPts=0, totalAmt=0, itemCnt=0;
function main() {
  prodList=[
    {id: 'p1', name: '상품1', val: 10000, q: 50 },
    {id: 'p2', name: '상품2', val: 20000, q: 30 },
    {id: 'p3', name: '상품3', val: 30000, q: 20 },
    {id: 'p4', name: '상품4', val: 15000, q: 0 },
    {id: 'p5', name: '상품5', val: 25000, q: 10 }
  ];

  var root=document.getElementById('app');
  let cont=document.createElement('div');
  var wrap=document.createElement('div');
  let hTxt=document.createElement('h1');
  cartDisp=document.createElement('div');
  sum=document.createElement('div');
  sel=document.createElement('select');
  addBtn=document.createElement('button');
  stockInfo=document.createElement('div');
  cartDisp.id='cart-items';
  sum.id='cart-total';
  sel.id='product-select';
  addBtn.id='add-to-cart';
  stockInfo.id='stock-status';
  cont.className='bg-gray-100 p-8';
  wrap.className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  hTxt.className='text-2xl font-bold mb-4';
  sum.className='text-xl font-bold my-4';
  sel.className='border rounded p-2 mr-2';
  addBtn.className='bg-blue-500 text-white px-4 py-2 rounded';
  stockInfo.className='text-sm text-gray-500 mt-2';
  hTxt.textContent='장바구니';
  addBtn.textContent='추가';

  updateSelOpts();
  wrap.appendChild(hTxt);
  wrap.appendChild(cartDisp);
  wrap.appendChild(sum);
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(stockInfo);
  cont.appendChild(wrap);
  root.appendChild(cont);
  calcCart();

  
  //할인 알람
  setTimeout( discountAlert(), Math.random() * 10000);

  //추가 구매 제안 알람
  setTimeout( addProductAlert(), Math.random() * 20000 );
};




main();

//이벤트 핸들러
addBtn.addEventListener('click', function () {
  var selItem=sel.value;
  var itemToAdd=prodList.find(function (p) { return p.id === selItem; });
  if(itemToAdd && itemToAdd.q > 0) {
    var item=document.getElementById(itemToAdd.id);
    if(item) {
      var newQty=parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if(newQty <= itemToAdd.q) {
        item.querySelector('span').textContent=itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {alert('재고가 부족합니다.');}
    } else {
      var newItem=document.createElement('div');
      newItem.id=itemToAdd.id;
      newItem.className='flex justify-between items-center mb-2';
      newItem.innerHTML='<span>' + itemToAdd.name + ' - ' + itemToAdd.val + '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }
    calcCart();
    lastSel=selItem;
  }
});


//이벤트 핸들러 
cartDisp.addEventListener('click', function (event) {
  var tgt=event.target;
  if(tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId=tgt.dataset.productId;
    var itemElem=document.getElementById(prodId);
    var prod=prodList.find(function (p) { return p.id === prodId; });
    if(tgt.classList.contains('quantity-change')) {
      var qtyChange=parseInt(tgt.dataset.change);
      var newQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if(newQty > 0 && newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
        itemElem.querySelector('span').textContent=itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if(newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if(tgt.classList.contains('remove-item')) {
      var remQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});