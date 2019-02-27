import React from "react";
import { Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";

export const Taskboard = ({ data }) => {
  return (
    <div>
      {data.map((item, i) => (
        <div className="col-sm-4">
          <Card
            className="inbox-card inbox-worklist-card"
            key={i}
            textChildren={
              <div>
                <div className="head">{item.head}</div>
                <div className="body">{item.body}</div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

const onModuleCardClick = (route) => {
  window.location.href = window.origin + route;
};

export const Boxboard = ({ data }) => {
  return (
    <div className="inbox-module-container">
      {data.map((item, i) => {
        return (
          <div className="inbox-module-card" onClick={() => onModuleCardClick(item.route)}>
            <Card
              className="inbox-card inbox-card-top"
              key={i}
              textChildren={
                <div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                    className="head"
                  >
                    {item.head}
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                    className="body"
                  >
                    <Label label={item.body} fontSize="16px" color="rgba(0, 0, 0, 0.87)" />
                  </div>
                </div>
              }
            />
          </div>
        );
      })}
    </div>
  );
};
