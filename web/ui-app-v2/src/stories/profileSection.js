import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import { action } from "@storybook/addon-actions";
import { ProfileSection } from '../components';
import theme from "../config/theme";

storiesOf("ProfileSection", module)
  .addDecorator(muiTheme([theme]))
  .add("with Location", () => <ProfileSection style={style} cardStyles={cardStyles} nameStyle={nameStyle} _label={_label} _label1={_label1}/>);


const style = {borderRadius: '50%', width: 85, height: 85};
const cardStyles = { 
  width: '84.5%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: '#e0e0e0'
}
const nameStyle = {
  paddingTop: 10,
  fontFamily: 'Roboto',
  fontSize: 7,
  fontWeight: 500,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: 0.3,
  color: '#484848',
  padding: 0,
  textTransform: 'none',

}
const _label = "Gyan";
const _label1 = "Ludhiana";