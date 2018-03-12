import React, { Component } from "react";
import Card from "../../../../components/Card";

const CardComponent = ({ complaints }) => {
  return (
    <Card
      header={complaints[0]}
      textChildren={
        <div>
          <span>{complaints[0].text} </span>
        </div>
      }
    />
  );
};

export default CardComponent;
