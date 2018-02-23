import React from 'react';
import PropTypes from "prop-types";
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Image from '../Image';
import Label from '../Label';
import img from '../../assets/people.jpg';

const ProfileSection = ({style,cardStyles,nameStyle,_label, _label1}) => {
  return (
    <div style={cardStyles}>
      <Image className={"img-circle"} style={style} source={img} height={200} width={200} />
      <Label label={_label} style={nameStyle}/>
      <Label label={_label1} style={nameStyle}/>
    </div>
  )   
}

export default ProfileSection;


ProfileSection.PropTypes = {
  style: PropTypes.object
}