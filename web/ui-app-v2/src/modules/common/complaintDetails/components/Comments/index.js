import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, List, Icon, Image } from "components";
import Label from "utils/translationNode";
import WriteComment from "../WriteComment";
import Avatar from "material-ui/Avatar";
import emptyFace from "../../../../../assets/images/download.png";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { getDateFromEpoch } from "utils/commons";
import isEqual from "lodash/isEqual";
import "./index.css";

// Don't Delete!!
// const itemsOne = [
//   {
//     leftAvatar: (
//       <div>
//         {" "}
//         <Avatar size={33} src={faceOne} />
//       </div>
//     ),
//     primaryText: (
//       <div className="complaint-details-comments-section">
//         <Label containerStyle={{ marginBottom: "8px" }} labelStyle={{ color: "#464646" }} label="please sterilize the dogs in the area." />{" "}
//         <Label labelClassName="rainmaker-small-font" label="11-MAR-18" />{" "}
//       </div>
//     ),
//   },
// ];

// Don't Delete!!
// const itemsTwo = [
//   {
//     primaryText: (
//       <div className="complaint-details-comments-section">
//         {" "}
//         <Label
//           containerStyle={{ marginBottom: "8px" }}
//           labelStyle={{ color: "#464646" }}
//           label="Sterilization is scheduled in March. We are doing our best to resolve your issue at this time."
//         />
//         <Label labelClassName="rainmaker-small-font" label="11-MAR-18" />
//       </div>
//     ),
//     rightAvatar: <Avatar size={33} src={faceTwo} />,
//   },
// ];

const imageStyles = {
  width: "33px",
  height: "33px",
  marginRight: "8px",
};

class Comments extends Component {
  // onChange = () => {
  //   this.props.onChange();
  // };
  constructor(props) {
    super(props);
    this.formConfig = require("config/forms/comment").default;
  }

  componentDidMount = () => {
    let { initForm } = this.props;
    initForm(this.formConfig);
  };

  componentWillReceiveProps = (nextProps) => {
    let { initForm, selectedComplaint } = this.props;
    if (!isEqual(nextProps.selectedComplaint, selectedComplaint)) {
      initForm(this.formConfig);
    }
  };

  render() {
    const { form, handleFieldChange, submitForm, selectedComplaint, userImage, userId, userName } = this.props;
    const { name: formKey } = this.formConfig;
    let items =
      selectedComplaint &&
      selectedComplaint.actions.filter((action, index) => {
        return action.comments && !action.status;
      });
    items && items.reverse();
    items =
      items &&
      items.map((action, index) => {
        if (action.by.split(":")[1].toLowerCase() === "citizen") {
          return {
            leftAvatar: (
              <div>
                <Image style={imageStyles} className="img-circle" size="medium" source={userId ? userImage : emptyFace} />
              </div>
            ),
            primaryText: (
              <div className="complaint-details-comments-section">
                <Label containerStyle={{ marginBbottom: "8px" }} label={action.by.split(":")[0] == userId ? userName : ""} />{" "}
                <Label containerStyle={{ marginBbottom: "8px" }} labelStyle={{ color: "#464646" }} label={action.comments} />{" "}
                <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(action.when)} />{" "}
              </div>
            ),
          };
        } else {
          return {
            primaryText: (
              <div className="complaint-details-comments-section">
                {" "}
                <Label containerStyle={{ marginBbottom: "8px" }} labelStyle={{ color: "#464646" }} label={action.comments} />
                <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(action.when)} />
              </div>
            ),
            rightAvatar: <Avatar size={33} src={action.by.split(":")[0] == userId ? userImage : emptyFace} />,
          };
        }
      });

    return (
      <div>
        {this.props.hasComments && (
          <Card
            style={{
              paddingBottom: "0px",
            }}
            textChildren={
              <div>
                <div className="rainmakcommunicationer-displayInline">
                  <Icon action="communication" name="forum" color="#969696" />{" "}
                  <Label label="CS_COMMON_COMMENTS" containerStyle={{ marginLeft: "13px", display: "inline-block" }} labelClassName="dark-heading" />
                </div>
                <List listContainerStyle={{ marginTop: "24px" }} listItemStyle={{ marginBottom: "-8.5px" }} items={items} />
                {/*<List listItemStyle={{ marginBottom: "-8.5px" }} items={itemsTwoNew} />*/}
                <WriteComment form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} userImage={userImage} />
              </div>
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const formKey = "comment";
  const form = state.form[formKey] || {};
  const { complaints } = state;
  let selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  const userImage = state.auth.userInfo.photo || "";
  const userId = state.auth.userInfo.id || "";
  const userName = state.auth.userInfo.name || "";
  return { form, selectedComplaint, userImage, userId, userName };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFieldChange: (formKey, fieldKey, value) => dispatch(handleFieldChange(formKey, fieldKey, value)),
    submitForm: (formKey) => dispatch(submitForm(formKey)),
    initForm: (form) => dispatch(initForm(form)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

//props types check yet to add
