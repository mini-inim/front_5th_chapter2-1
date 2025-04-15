import { useState } from "react";

//포인트 계산
const renderBonusPts=() => {
    bonusPts = Math.floor(totalAmt / 1000);
    var ptsTag=document.getElementById('loyalty-points');
    if(!ptsTag) {
      ptsTag=document.createElement('span');
      ptsTag.id='loyalty-points';
      ptsTag.className='text-blue-500 ml-2';
      sum.appendChild(ptsTag);
    }
    ptsTag.textContent='(포인트: ' + bonusPts + ')';
  };

  function bonusPoint (){
    const totalPrice = 0; //임시 
    const point = Math.floor(totalPrice / 1000);
  }

  //가격 계산 함수
function calcCart() {
    totalAmt=0;
    itemCnt=0;

    const [ totalPrice, totalItem ] = useState(0);
    var cartItems=cartDisp.children;
    var subTot=0;

    for (var i=0; i < cartItems.length; i++) {
      (function () {
        var curItem;
        for (var j=0; j < prodList.length; j++) {
          if(prodList[j].id === cartItems[i].id) {
            curItem=prodList[j];
            break;
          }
        }

        var q=parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);
        var itemTot=curItem.val * q;
        var disc=0;
        itemCnt += q;
        subTot += itemTot;

        if(q >= 10) {
          if(curItem.id === 'p1') disc=0.1;
          else if(curItem.id === 'p2') disc=0.15;
          else if(curItem.id === 'p3') disc=0.2;
          else if(curItem.id === 'p4') disc=0.05;
          else if(curItem.id === 'p5') disc=0.25;
        }

        totalAmt += itemTot * (1 - disc);
      })();
    }

    let discRate=0;

    //item 개수가 30개 이상
    if(itemCnt >= 30) {
      var bulkDisc=totalAmt * 0.25;
      var itemDisc=subTot - totalAmt;
      if(bulkDisc > itemDisc) {
        totalAmt=subTot * (1 - 0.25);
        discRate=0.25;
      } else {
        discRate=(subTot - totalAmt) / subTot;
      }
    } else {
      discRate=(subTot - totalAmt) / subTot;
    }


    if(new Date().getDay() === 2) {
      totalAmt *= (1 - 0.1);
      discRate=Math.max(discRate, 0.1);
    }

    sum.textContent='총액: ' + Math.round(totalAmt) + '원';


    //할인 경우
    if(discRate > 0) {
      var span=document.createElement('span');
      span.className='text-green-500 ml-2';
      span.textContent='(' + (discRate * 100).toFixed(1) + '% 할인 적용)';
      sum.appendChild(span);
    }


    //재고 함수 실시간 렌더링 
    //updateStockInfo();
    
    //적립금 함수 실행
    renderBonusPts();
  }
  

  export { bonusPoint };