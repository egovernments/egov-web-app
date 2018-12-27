import React from "react";
import { Card } from "components";
import "./index.css";

const cards = (data) => {
  return data.map((item, i) => (
    <div className="col-sm-4">
      <Card
        className="inbox-card"
        key={i}
        textChildren={
          <div>
            <div className="head">{item.head}</div>
            <div className="body">{item.body}</div>
          </div>
        }
      />
    </div>
  ));
};

const Taskboard = ({ data }) => {
  return <div>{cards(data)}</div>;
};
export default Taskboard;
