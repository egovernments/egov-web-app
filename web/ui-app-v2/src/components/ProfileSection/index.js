import React from 'react';
import PropTypes from "prop-types";
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Image from '../Image';
import Label from '../Label';
import LocationIcon from "material-ui/svg-icons/maps/place";

const ProfileSection = ({style,cardStyles,label1, label2, name, location, imgSrc}) => {
  return (
    <div style={cardStyles}>
      <Image className={"img-circle"} style={style} source={imgSrc} height={200} width={200} />
      <Label label={name} style={label1}/>
      <Label labelPosition="after" label={location} style={label2} icon={<LocationIcon/>} />
    </div>
  )   
}

export default ProfileSection;


ProfileSection.propTypes = {
  style: PropTypes.object,
  cardStyles: PropTypes.object,
  label1: PropTypes.object,
  label2: PropTypes.object,
  iconStyle: PropTypes.object,
}