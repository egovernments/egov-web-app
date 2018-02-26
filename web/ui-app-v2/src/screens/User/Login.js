import React, { Component } from 'react';
import { withRouter } from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Image from '../../components/Image';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

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

class Login extends Component {
  login = () => {
    this.props.history.push('/otp');
  };

  render() {
    const { login } = this;
    return (
      <div className="col-xs-12 col-lg-4 col-sm-6 col-md-4 col-lg-offset-4 col-sm-offset-3 col-md-offset-4">
        <Image source="https://placeimg.com/450/450/arch" />
        <Paper style={styles.formContainer} zDepth={1}>
          <Image style={styles.logo} circular={true} source="https://placeimg.com/100/100/tech" />
          <form>
            <TextField className="textfield" id="name" fullWidth={true} placeholder="Name" />
            <DropDownMenu style={styles.dropDown} value={1}>
              <MenuItem style={{ width: '100%' }} value={1} primaryText="Amritsar" />
            </DropDownMenu>
            <br />
            <TextField className="textfield" id="phone-number" underlineShow={false} fullWidth={true} placeholder="Phone Number" />
            <br />
            <Button onClick={login} primary={true} label="Submit" fullWidth={true} />
          </form>
        </Paper>
      </div>
    );
  }
}

export default withRouter(Login);
