import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, List, Icon } from "../../../../../components";
import Label from "utils/translationNode";
import WriteComment from "../WriteComment";
import Avatar from "material-ui/Avatar";
import faceOne from "../../../../../assets/images/faceOne.jpg";
import faceTwo from "../../../../../assets/images/faceTwo.jpg";
import { handleFieldChange, submitForm, initForm } from "redux/form/actions";
import { getDateFromEpoch, mapCompIDToName } from "utils/commons";
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
    if (!isEqual(nextProps.selectedComplaint, this.props.selectedComplaint)) {
      initForm(this.formConfig);
    }
  };

  render() {
    const { form, handleFieldChange, submitForm, selectedComplaint } = this.props;
    const { name: formKey } = this.formConfig;
    let items = selectedComplaint.actions.filter((action, index) => {
      return action.comments && !action.status;
    });
    items.reverse();
    items = items.map((action, index) => {
      if (action.by.split(":")[1].toLowerCase() === "citizen") {
        return {
          leftAvatar: (
            <div>
              {" "}
              <Avatar size={33} src={faceOne} />
            </div>
          ),
          primaryText: (
            <div className="complaint-details-comments-section">
              <Label containerStyle={{ marginBottom: "8px" }} labelStyle={{ color: "#464646" }} label={action.comments} />{" "}
              <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(action.when)} />{" "}
            </div>
          ),
        };
      } else {
        return {
          primaryText: (
            <div className="complaint-details-comments-section">
              {" "}
              <Label containerStyle={{ marginBottom: "8px" }} labelStyle={{ color: "#464646" }} label={action.comments} />
              <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(action.when)} />
            </div>
          ),
          rightAvatar: <Avatar size={33} src={faceTwo} />,
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
                <div className="rainmaker-displayInline">
                  <Icon action="communication" name="forum" color="#969696" />{" "}
                  <Label label="CS_COMMON_COMMENTS" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
                </div>
                <List listContainerStyle={{ marginTop: "24px" }} listItemStyle={{ marginBottom: "-8.5px" }} items={items} />
                {/*<List listItemStyle={{ marginBottom: "-8.5px" }} items={itemsTwoNew} />*/}
                <WriteComment form={form} formKey={formKey} onChange={handleFieldChange} submitForm={submitForm} />
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
  return { form, selectedComplaint };
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
