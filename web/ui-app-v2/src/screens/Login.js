import React, { Component } from 'react';
import TextField from '../components/TextField';
import Button from '../components/Button';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Image from '../components/Image';

const styles = {
  logo: {
    margin: '0 auto',
    display: 'block',
  },
  dropDown: {
    width: '100%',
    background: '#f2f2f2',
    height: '56px',
  },
  imageContainer: {
    position: 'relative',
  },
  formContainer: {
    padding: '10px',
    // why 65? ~= imageHeight/2 + paddding + bottomMargin
    marginTop: '-65px',
  },
};

const Banner = () => {};

const Form = () => {};

export default class Login extends Component {
  render() {
    return (
      <div>
        <Image source="https://placeimg.com/450/450/arch" />
        <Paper style={styles.formContainer} zDepth={1}>
          <Image style={styles.logo} circular={true} source="https://placeimg.com/100/100/tech" />
          <form>
            <TextField className="textfield" id="name" fullWidth={true} placeholder="Name" />
            <DropDownMenu style={styles.dropDown} value={1}>
              <MenuItem value={1} primaryText="Amritsar" />
            </DropDownMenu>
            <br />
            <TextField className="textfield" id="phone-number" underlineShow={false} fullWidth={true} placeholder="Phone Number" />
            <br />
            <Button primary={true} label="Submit" fullWidth={true} />
          </form>
        </Paper>
      </div>
    );
  }
}
