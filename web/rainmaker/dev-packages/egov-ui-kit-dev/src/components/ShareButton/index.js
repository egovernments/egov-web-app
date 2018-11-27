import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { withStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import DialogWithTextBox from "../DialogWithTextBox";
import { sendMessage } from "egov-ui-kit/redux/complaints/actions";
import { connect } from "react-redux";
import { httpRequest } from "egov-ui-kit/utils/api";
import { checkPattern, sharePopupLabels } from "egov-ui-kit/utils/commons";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 999,
  },
  menuItem: {
    zIndex: 99999,
  },
});

// const suggestions = ["Red", "Orange", "Yellow", "Green", "Blue", "Pur=ple", "Black", "White"];

const suggestions = [
  {
    id: "1234",
    tenantId: "pb.amrtisar",
    userId: "abcd",
    name: "abcd",
    phone: "9987654322",
    email: "asd1@gmail.com",
  },
  {
    id: "123",
    tenantId: "pb.amrtisar",
    userId: "abc",
    name: "abc",
    phone: "9987654321",
    email: "asd@gmail.com ",
  },
];

class MenuListComposition extends React.Component {
  state = {
    open: false,
    popOpen: false,
    lableText: "",
    errorText: "",
    dataSource: suggestions,
    popupLablesPlaceHolders: {
      sendLabel: "",
      nameLabel: "",
      secondaryLabel: "",
      sendPalceHolder: "",
      namePlaceHolder: "",
      secondaryPlaceHolder: "",
      sendDataType: "",
      secondaryDataType: "",
      dataConfigval: "",
      dataSecondaryConfig: "",
    },
    nameVal: "",
    secondaryVal: "",
  };

  onNameHandleChange = (event, val) => {
    this.setState({ nameVal: val });
  };
  onSecondValueHandleChange = (event, val) => {
    this.setState({ secondaryVal: val });
  };

  onAutoCompletTextChangeCallBack = (val) => {
    console.log("sudhan", this.state.popupLablesPlaceHolders["sendDataType"]);
    const type = this.state.popupLablesPlaceHolders["sendDataType"];
    const matched = checkPattern(val, type);
    if (matched) {
      this.state.dataSource.map((elem) => {
        const { dataConfigval, dataSecondaryConfig } = this.state.popupLablesPlaceHolders;

        if (elem[dataConfigval] === val) {
          this.setState({ nameVal: elem["name"], secondaryVal: elem[dataSecondaryConfig] });
        }
      });
    }
  };

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.onLoadFn();
  }
  popUp = (elem) => {
    this.setState({ popOpen: true });
    this.setState({ lableText: elem });
    this.setState({ popupLablesPlaceHolders: sharePopupLabels(elem) });

    this.props.sendMessage(elem.toUpperCase(), "ShareMetaData.shareMedia");
  };

  closeDialog = () => {
    this.setState({ popOpen: false });
  };

  onSend = async (val) => {
    const { shareMedia } = this.props.ShareMetaData;
    const matched = shareMedia === "SMS" || shareMedia === "WHATSAPP" ? checkPattern(val, "Mobile") : checkPattern(val, "Email");
    matched ? this.setState({ errorText: "" }) : this.setState({ errorText: "Enter Correct Details" });
    if (matched) {
      this.props.sendMessage(val, "ShareMetaData.shareContent.to");
      this.setState({ popOpen: false });
      const { ShareMetaData } = this.props;
      const payload = await httpRequest("/egov-ui-transform-service/share/v1/_create", "", [], ShareMetaData);
    }
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const defaultShare = ["SMS", "Email", "Whatsapp"];
    const { extraShare } = this.props;
    const shareList = extraShare && extraShare instanceof Array ? [...defaultShare, ...extraShare] : defaultShare;
    return (
      <div className={classes.root}>
        <div className={classes.menuItem}>
          <Button
            buttonRef={(node) => {
              this.anchorEl = node;
            }}
            variant="fab"
            className={classes.fab}
            aria-owns={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <ShareIcon />
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} id="menu-list-grow" style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {shareList.map((elem, index) => (
                        <MenuItem key={index} value={index} onClick={(e) => this.popUp(elem)}>
                          {elem}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <DialogWithTextBox
            lableText={this.state.lableText}
            errorText={this.state.errorText}
            popOpen={this.state.popOpen}
            closeDialog={this.closeDialog}
            onSend={(a) => this.onSend(a)}
            onAutoCompletTextChangeCallBack={this.onAutoCompletTextChangeCallBack}
            dataSource={this.state.dataSource}
            popupLablesPlaceHolders={this.state.popupLablesPlaceHolders}
            onNameHandleChange={this.onNameHandleChange}
            onSecondValueHandleChange={this.onSecondValueHandleChange}
            nameVal={this.state.nameVal}
            secondaryVal={this.state.secondaryVal}
          />
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message, jsonPath) => dispatch(sendMessage(message, jsonPath)),
  };
};

const mapStateToProps = (state) => {
  const { complaints } = state;
  const { ShareMetaData } = complaints;
  return { ShareMetaData };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MenuListComposition));
