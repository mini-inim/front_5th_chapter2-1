//할인 알람
function discountAlert () {
    setInterval(function () {
      var luckyItem=prodList[Math.floor(Math.random() * prodList.length)];
      if(Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val=Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        //updateSelOpts();
      }
    }, 30000);
  };


  //추가 구매 제안 알람
  function addProdcutAlert() {
    setInterval(function () {
      if(lastSel) {
        var suggest=prodList.find(function (item) { return item.id !== lastSel && item.q > 0; });
        if(suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val=Math.round(suggest.val * 0.95);
          //updateSelOpts();
        }
      }
    }, 60000);
  };

  export {addProdcutAlert, discountAlert};