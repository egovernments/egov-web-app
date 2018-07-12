import React from "react";
import Icon from "../Icon";

const BreadCrums = ({ pageName }) => {
  return (
    <div className="rainmaker-displayInline">
      <Icon action="action" name="home" color="#fe7a51" />
      {pageName && (
        <div>
          <div style={{ marginLeft: 10, marginTop: 2 }}>❯</div>
          <div>{pageName}</div>
        </div>
      )}
    </div>
  );
};

export default BreadCrums;
