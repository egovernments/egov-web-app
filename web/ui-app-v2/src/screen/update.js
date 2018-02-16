import React, { Component } from "react";
import { Button } from "../components";
import renderGroups from "./render-groups";

class Update extends Component {
  componentDidMount() {
    const { search, searchUrl } = this.props;
    search(searchUrl);
  }

  update = () => {
    this.props.submitFormData();
  };

  render() {
    const { isFormValid, groups } = this.props;
    const { update } = this;

    return (
      <div className="row">
        {renderGroups(groups)}
        <div className="textcenter">
          <Button
            primary={true}
            disabled={!isFormValid}
            label="Update"
            style={{ marginRight: "20px" }}
            onClick={update}
          />
        </div>
      </div>
    );
  }
}

export default Update;
