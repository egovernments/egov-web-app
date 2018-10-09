import React from "react";

const Iframe=(props)=>{
  return (
    <iframe src={props.src}  {...props}></iframe>
  )
}

export default Iframe;


//future it shud be added like this
