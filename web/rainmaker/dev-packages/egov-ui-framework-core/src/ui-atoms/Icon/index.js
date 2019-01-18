import React from "react";
import PropTypes from "prop-types";
import Icon from '@material-ui/core/Icon';

const MihyIcon=(props)=>{
  const {iconName,color,size="24px",...rest}=props;
  return (
    <Icon color={color} style={{ fontSize: size }} {...rest}>
      {iconName}
    </Icon>
  )
}

MihyIcon.propTypes={
  iconName:PropTypes.string
}

export default MihyIcon;
