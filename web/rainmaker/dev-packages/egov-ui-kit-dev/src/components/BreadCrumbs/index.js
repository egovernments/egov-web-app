import React from "react";
import Icon from "../Icon";

const style = { marginLeft: 10, marginTop: 2 };

const BreadCrumbs = ({ url, onTitleClick }) => {
  return (
    <div className="rainmaker-displayInline" style={{ paddingLeft: 15 }}>
      <Icon action="action" name="home" color="#fe7a51" />
      {url &&
        url.map((item, index) => {
          return (
            <div className="rainmaker-displayInline">
              <div style={style}>❯</div>
              <div onClick={onTitleClick} style={style}>
                {item}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
