import React, { Component } from 'react';
import { Card, Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import './index.css';
const moduleCardButtons = {
    width: "93%",
    border: "1px solid #fe7a51",
    boxSizing : "border-box"
}
const moduleCardButtonsContainer = {
    padding : "0"
}
const moduleIconStyle = {
    width:"75px",
    height:"75px",
    paddingTop:"10px"
}
const ModuleCard = ({moduleCardTitle, moduleCardDescription, modulePrimaryCaption, moduleSecondaryCaption, borderLeftColor, iconAction, iconName }) => {
    return (
        <div className="col-sm-6">
            <Card id="home-complaint-card" className="clearfix landingPageCard" style = { borderLeftColor } textChildren = {
                <div className="clearfix">
                    <div className="col-sm-2">
                     <Icon action = { iconAction } name = { iconName } style = { moduleIconStyle} /> 
                    </div>
                    <div className="col-sm-10">
                        <div className="col-sm-12">
                            <Label className="moduleCardTitle" label = { moduleCardTitle } />
                        </div>
                        <div className="col-sm-12">
                            <Label className="moduleCardDescription" label = { moduleCardDescription } />
                        </div>
                        <div class="col-sm-12">
                        <div class="col-sm-6" style = { moduleCardButtonsContainer } >
                            <Button label = { modulePrimaryCaption } primary="true" style = {{ align: "left" }} style = { moduleCardButtons }/>
                        </div>
                        <div class="col-sm-6" style = { moduleCardButtonsContainer }>
                            <Button label = { moduleSecondaryCaption } style = {{ align: "right" }} style = { moduleCardButtons } className = "moduleSecondButton" />
                        </div>
                        </div>
                    </div>
                </div>
            } />
    </div> 
    );
}

export default ModuleCard;