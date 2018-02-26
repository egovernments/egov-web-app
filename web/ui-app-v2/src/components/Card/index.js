import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';

const CardUi = ({ header, mediaOverlay, mediaChildren, title, textChildren, actionChildren }) => {
  return (
    <Card>
      <CardHeader {...header} />
      <CardMedia overlay={mediaOverlay}>{mediaChildren}</CardMedia>
      <CardTitle {...title} />
      <CardText>{textChildren}</CardText>
      <CardActions>{actionChildren}</CardActions>
    </Card>
  );
};

export default CardUi;

CardUi.propTypes = {
  header: PropTypes.object,
  mediaOverlay: PropTypes.element,
  mediaChildren: PropTypes.element,
  title: PropTypes.object,
  textChildren: PropTypes.element,
  actionChildren: PropTypes.element,
};
