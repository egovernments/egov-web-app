import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
// import img from '../images/open.jpg'
const img = "";

export default class Dialogui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: "Babika",
      inputname: "Babika",
      select: false
    };
  }
  handleOpen = () => {
    let name = this.state.username;
    this.setState({
      open: true,
      inputname: name
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  handleOk = () => {
    let name = this.state.inputname;
    this.setState({
      select: true,
      open: false,
      username: name
    });
  };
  handleReset = () => {
    let name = this.state.username;
    this.setState({
      inputname: name
    });
  };
  handleChange = event => {
    let name = event.target.value;
    //let select=this.state.select;
    console.log(name);
    this.setState({
      inputname: name
    });
  };

  render() {
    let { close, ok, reset } = this.props;
    const actions = close
      ? [<FlatButton label="close" primary={true} onClick={this.handleClose} />]
      : ok
        ? [
            <FlatButton label="ok" primary={true} onClick={this.handleOk} />,
            <FlatButton
              label="close"
              primary={true}
              onClick={this.handleClose}
            />
          ]
        : [
            <FlatButton label="ok" primary={true} onClick={this.handleOk} />,
            <FlatButton
              label="close"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="reset"
              primary={true}
              onClick={this.handleReset}
            />
          ];
    let username = this.state.username;
    let inputname = this.state.inputname;
    let open = this.state.open;
    return (
      <div>
        <FlatButton
          style={{ width: "10%", height: "80%" }}
          icon={<img src={img} height="50px" width="100%" />}
          type="button"
          primary={true}
          onClick={this.handleOpen}
        />
        <Dialog
          style={{ width: "90%", height: "95%" }}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{ background: "lightblue" }}>
            {<h2 style={{ color: "black" }}>Example Dialog</h2>}
            {(ok || reset) && (
              <div>
                <label style={{ color: "black" }}>Enter Your Name:</label>
                <input
                  type="text"
                  value={inputname}
                  onChange={this.handleChange}
                />
              </div>
            )}
          </div>
        </Dialog>
        {!open && (ok || reset) && <p>Welcome {username} </p>}
      </div>
    );
  }
}
