import { addEvent } from "./eventManager";

function createElement(Node){
    if(typeof Node === "boolean" || Node === null || Node === undefined ){
        return document.createTextNode("");
    }

    if (typeof Node === "string" || typeof Node === "number") {
        return document.createTextNode(Node.toString());
      }

    if(Array.isArray(Node)){
        const fragment = document.createDocumentFragment();

        for (const { type, children } of Node){
            const child = document.createElement(type);

            child.textContent = `${children[0]}`;
            fragment.appendChild(child);
        }

        return fragment;
    }

    if(typeof Node === "object" && Node.type){
        const el = document.createElement(Node.type);

        if(Node.props){
            updateAttributes(el, Node.types);
        }

        for(const child of Node.children || []){
            el.appendChild(createElement(child));
        }

        return el;
    }
}

function updateAttributes($el, props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase();
        addEvent($el, eventType, value);
        return;
      }
  
      if (key === "className") {
        $el.setAttribute("class", value);
      } else {
        $el.setAttribute(key, value);
      }
    });
  }
  

export { createElement };