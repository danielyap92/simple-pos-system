import React from "react";

function Footer() {

let footerStyle = {
    height:"50px",
    backgroundColor:"blue",
    color:"white",
    fontSize:"1rem",
    textAlign:"center",
    marginTop:"20px",
    display:"grid",
    alignItems:"center"
}

    return <div style={footerStyle}>
        All Right Reserve {new Date().getFullYear()}
    </div>

}

export default Footer;