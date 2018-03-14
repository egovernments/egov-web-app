import React from "react";

const Screen=({children,className=""})=>{
  return (
    <div className={`screen col-lg-offset-2 col-md-offset-2 col-md-8 col-lg-8 ${className}`} style={{paddingBottom:"76px"}}>
        {children}
    </div>
  )
}

export default Screen;
