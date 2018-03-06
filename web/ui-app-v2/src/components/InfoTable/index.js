import React from "react";

const InfoTable = ({ items, labelContainer, valueContainer, itemContainer }) => {
  return items.map((item, index) => {
    return (
      <div key={index} className={itemContainer}>
        <div className={labelContainer}>
          <span>{item.label}</span>
        </div>
        <div className={valueContainer} children={item.JSX} />
      </div>
    );
  });
};

export default InfoTable;
