import React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import PropTypes from "prop-types";

// const styles = {
//   cardUi: {
//     color: "rgb(95, 92, 98)",
//     backgroundColor: "rgb(247, 247, 247)",
//     transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
//     boxSizing: "border-box",
//     fontFamily: "Lato, sans",
//     WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
//     boxShadow:
//       "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
//     borderRadius: "2px",
//     zIndex: "1",
//     display: "block",
//     padding: "15px",
//     margin: "15px"
//   },
//   cardTitle: {
//     color: "rgb(53, 79, 87)",
//     fontSize: "18px",
//     margin: "8px 0px",
//     marginBottom: "15px"
//   }
// };

const CardUi = ({card, header, mediaOverlay, mediaChildren, title,text, textChildren, actionChildren }) => {
  return (
    <Card style={{backgroundColor : "#fff" }} {...card}>
      {header && <CardHeader {...header} />}
      {mediaOverlay && <CardMedia overlay={mediaOverlay}>{mediaChildren}</CardMedia>}
      {title && <CardTitle {...title} />}
      {textChildren && <CardText {...text} style={{padding : 0 }}>{textChildren}</CardText>}
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
