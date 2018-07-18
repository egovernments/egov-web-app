import React from "react";
import Icon from "../Icon";

const style = { marginLeft: 10, marginTop: 2, cursor: "pointer" };
const selStyle = { color: "#fe7a51" };

const BreadCrumbs = ({ url, history }) => {
  return (
    <div className="rainmaker-displayInline" style={{ paddingLeft: 15 }}>
      <Icon action="action" name="home" color="#fe7a51" />
      {url &&
        url.map((item, index) => {
          return (
            <div className="rainmaker-displayInline">
              <div style={style}>❯</div>
              <div
                onClick={() => {
                  url.length > 1 && index != url.length - 1 && history.push(item.path);
                }}
                style={url.length - 1 === index ? style : { ...selStyle, ...style }}
              >
                {item.title}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
