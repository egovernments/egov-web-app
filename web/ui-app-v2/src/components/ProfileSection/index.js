import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import FontIcon from "material-ui/FontIcon";
import List from "material-ui/List/List";
import ListItem from "material-ui/List/ListItem";
import Image from "../Image";
import Label from "../Label";
import { Icon } from "../../components";

import LocationIcon from "material-ui/svg-icons/maps/place";

const ProfileSection = ({ imgStyle, cardStyles, nameStyle, locationStyle, name, location, addIconName, imgSrc, addIconStyle, onClickAddPic }) => {
  return (
    <div className="profileSection" style={cardStyles}>
      <div className="profileContainer" style={{ textAlign: "center" }}>
        <Image className="img-Profile" circular={true} style={imgStyle} source={imgSrc} />
        {addIconName && <Icon id="profile-upload-icon" style={addIconStyle} action="image" name={addIconName} onClick={onClickAddPic} />}
        {name && <Label className="name-Profile" label={name} style={nameStyle} />}
        {location && <Label className="loc-Profile" labelPosition="after" label={location} style={locationStyle} icon={<LocationIcon />} />}
      </div>
    </div>
  );
};

export default ProfileSection;

ProfileSection.propTypes = {
  style: PropTypes.object,
  cardStyles: PropTypes.object,
  nameStyle: PropTypes.object,
  locationStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  onClickAddPic: PropTypes.func,
};
