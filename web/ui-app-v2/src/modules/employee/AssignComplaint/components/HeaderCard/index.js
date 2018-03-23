import React from "react";
import { Card, Icon, Label } from "../../../../../components";

const addressStyle = {
  display: "inline-block",
};

const iconStyle = {
  display: "inline-block",
  width: 14,
  height: 14,
  marginRight: 7,
};

const headerStyle = {
  letterSpacing: "0.7px",
};

const HeaderCard = () => {
  return (
    <Card
      textChildren={[
        <Label
          key={1}
          label="Overflow of Garbage Bins"
          dark={true}
          bold={true}
          fontSize={16}
          labelStyle={headerStyle}
          containerStyle={{ marginBottom: 10 }}
        />,
        <Icon key={2} action="maps" name="place" style={iconStyle} color={"#969696"} />,
        <Label containerStyle={addressStyle} dark={true} key={3} label="1st main road, Sector 32, Amritsar" />,
      ]}
    />
  );
};

export default HeaderCard;
