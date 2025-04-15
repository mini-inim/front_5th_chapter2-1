import { createElement } from "../hooks/createElement";

const stockInfo = createElement(
    'div',
    { id: 'stock-status',
      className: 'text-sm text-gray-500 mt-2'
    }
);

return { stockInfo };