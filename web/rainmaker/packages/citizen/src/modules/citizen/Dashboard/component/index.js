import React from "react";
import { Card, Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import "./index.css";

const moduleCardButtons = {
  width: "93%",
  border: "1px solid #fe7a51",
  boxSizing: "border-box",
};
const moduleCardButtonsContainer = {
  padding: "0",
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
                      <div className="col-sm-12">
                        <Label className="moduleCardTitle" label={item.moduleTitle} />
                      </div>
                      <div className="col-sm-12">
                        <Label className="moduleCardDescription" label={item.moduleDescription} />
                      </div>
                      <div class="col-sm-12" style={{ paddingBottom: "12px" }}>
                        <div class="col-sm-6" style={moduleCardButtonsContainer}>
                          <Button
                            onClick={() => onButton1Click(item)}
                            label={item.modulePrimaryCaption}
                            primary="true"
                            style={{ align: "left" }}
                            style={moduleCardButtons}
                          />
                        </div>
                        <div class="col-sm-6" style={moduleCardButtonsContainer}>
                          <Button
                            onClick={() => onButton2Click(item)}
                            label={item.moduleSecondaryCaption}
                            style={{ align: "right" }}
                            style={moduleCardButtons}
                            className="moduleSecondButton"
                          />
                        </div>
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
