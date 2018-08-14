import React from "react";
import { Card, Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const moduleCardButtons = {
  width: "93%",
};
const moduleCardButtonsContainer = {
  padding: "0px 0px 12px 0px",
};
const moduleIconStyle = {
  width: "75px",
  height: "75px",
  paddingTop: "10px",
};

const ModuleCard = ({ items, onButton1Click, onButton2Click }) => {
  return (
    <div>
      {items &&
        items.map((item, key) => {
          return (
            <div className="col-sm-6">
              <Card
                id="home-complaint-card"
                className="clearfix landingPageCard"
                style={item.borderLeftColor}
                textChildren={
                  <div className="clearfix">
                    <div className="col-sm-2">
                      <Icon action={item.iconAction} name={item.iconName} style={moduleIconStyle} />
                    </div>
                    <div className="col-sm-10">
                      <Label className="moduleCardTitle" label={item.moduleTitle} />
                      <Label className="moduleCardDescription" label={item.moduleDescription} />
                      <div class="col-sm-6" style={moduleCardButtonsContainer}>
                        <Button
                          onClick={() => onButton1Click(item)}
                          label={<Label label={item.button1} color="#fff" />}
                          primary="true"
                          style={{ align: "left" }}
                          style={moduleCardButtons}
                          buttonStyle={{ border: "1px solid #fe7a51" }}
                          labelStyle={{
                            padding: "0 12px 0 12px ",
                            letterSpacing: "0.6px",
                            display: "inline-block",
                            height: "22px",
                            lineHeight: "22px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
                      <div class="col-sm-6" style={moduleCardButtonsContainer}>
                        <Button
                          onClick={() => onButton2Click(item)}
                          label={<Label label={item.button2} color="#fe7a51" />}
                          style={{ align: "right" }}
                          style={moduleCardButtons}
                          buttonStyle={{ border: "1px solid #fe7a51" }}
                          className="moduleSecondButton"
                          labelStyle={{
                            padding: "0 12px 0 12px ",
                            letterSpacing: "0.6px",
                            display: "inline-block",
                            height: "22px",
                            lineHeight: "22px",
                            fontSize: "14px",
                          }}
                        />
                      </div>
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

export default ModuleCard;
