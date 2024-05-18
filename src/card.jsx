import React from "react";

function Card(props) {

    const ownStyle = {
      width: "18rem"
    }
    
    const noGap = {
      marginBottom:"0"
    }

    return (

    <div className="card" style={ownStyle}>

      <img src={props.img} className="card-img-top card-image" alt="..." />
      <div className="card-body">
        <h5 style={noGap} className="card-title">{props.name}</h5>
        <p style={noGap} className="card-text">Item ID: {props.id}</p>
        <p className="card-text">{props.description}</p>
        <p className="card-text">RM {props.price}</p>
      </div>
    </div>
    )
    }
    
    export default Card;
    