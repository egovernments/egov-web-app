import React from "react";
import { Label, TextField, TextFieldIcon, Icon } from "components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TrackIcon from "material-ui/svg-icons/maps/my-location";

const labelIconStyle = {
  width: "24px",
  height: "24px",
};

class PropertyAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  propertyNoOnchange = (e) => {};

  areaNameOnChange = (e) => {};

  streetOnChange = (e) => {};

  render() {
    return (
      <div className="pt-property-address">
        <TextField
          id=""
          hintText="Enter House/Property no."
          floatingLabelText="House/Property No."
          name="house-no"
          isRequired={true}
          onChange={this.propertyNoOnchange}
          fullWidth={true}
          maxLength="250"
        />
        <TextField
          id=""
          hintText="Enter Area name"
          floatingLabelText="Colony/Mohalla Area"
          name="area-name"
          onChange={this.areaNameOnChange}
          isRequired={true}
          fullWidth={true}
          maxLength="250"
        />
        <TextField
          id=""
          hintText="Enter street name"
          floatingLabelText="Street Name"
          name="street-name"
          onChange={this.streetOnChange}
          isRequired={true}
          fullWidth={true}
          maxLength="250"
        />
        <Link to="/citizen/pt-locate-property">
          <TextFieldIcon
            name="pt-location"
            isRequired={false}
            hintText="Select Location"
            floatingLabelText="Location"
            id="pt-location"
            iconPosition="after"
            fullWidth={true}
            Icon={TrackIcon}
          />
        </Link>
      </div>
    );
  }
}

export default connect(null, null)(PropertyAddress);
