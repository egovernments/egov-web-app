import React from "react";
import { Card } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import Icon from "egov-ui-kit/components/Icon";

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
                <Label labelClassName="body" label={item.body} />
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

const onModuleCardClick = (route) => {
  const url = process.env.NODE_ENV === "production" ? `employee/${route}` : route;
  window.location.href = window.origin + "/" + url;
};

const iconStyle = {
  width: "48px",
  height: "46.02px",
};

export const Boxboard = ({ data }) => {
  return (
    <div className="inbox-module-container">
      {data.map((item, i) => {
        return (
          <div className="inbox-module-card" id={`emp-${item.displayName.split(" ")[0]}-card`} onClick={() => onModuleCardClick(item.navigationURL)}>
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
                    <Icon action={item.leftIcon.split(":")[0]} name={item.leftIcon.split(":")[1]} style={iconStyle} />
                  </div>
                  <div
                    style={{
                      marginTop: 20,
                    }}
                    className="body"
                  >
                    <Label label={item.displayName} fontSize="16px" color="rgba(0, 0, 0, 0.87)" />
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
