import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    if (count > 0){
    setCount(count - 1);}
  }

  return (
    <div className="d-flex">
      <button className="qtyBtn" onClick={decrease}>-</button>
      <h1 className="qtyNum"  >{count}</h1>
      <button className="qtyBtn" onClick={increase}>+</button>
    </div>
  );
}

export default Counter;
