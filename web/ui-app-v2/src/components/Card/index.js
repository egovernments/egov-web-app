import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import PropTypes from "prop-types";

const CardUi = ({ card, header, mediaOverlay, mediaChildren, title, text, textChildren, actionChildren }) => {
  return (
    <Card style={{ margin: "10px 0px" }} {...card}>
      {header && <CardHeader {...header} />}
      {mediaOverlay && <CardMedia overlay={mediaOverlay}>{mediaChildren}</CardMedia>}
      {title && <CardTitle {...title} />}
      {textChildren && (
        <CardText
          {...text}
          style={{
            padding: 0,
          }}
        >
          {textChildren}
        </CardText>
      )}
      {actionChildren && <CardActions>{actionChildren}</CardActions>}
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
