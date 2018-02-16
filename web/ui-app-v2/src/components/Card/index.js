import React from "react";
import { Card, CardHeader, CardText } from 'material-ui/Card';

const styles = {
  cardUi: {
    color: "rgb(95, 92, 98)",
    backgroundColor: "rgb(247, 247, 247)",
    transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
    boxSizing: "border-box",
    fontFamily: "Lato, sans",
    WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
    borderRadius: "2px",
    zIndex: "1",
    display: "block",
    padding: "15px",
    margin: "15px"
  },
  cardTitle: {
    color: "rgb(53, 79, 87)",
    fontSize: "18px",
    margin: "8px 0px",
    marginBottom: "15px"
  }
};

const CardUi = ({ children, cardTitle }) => {
  return (
    <Card
      expanded = {true}
      style= {styles.cardUi}
    >
      <CardHeader
        title = {cardTitle}
      />
      <CardText>
        <div className = "container">
          <div className = "row">
            {children}
          </div>
        </div>
      </CardText>
    </Card>
    // <div style={styles.cardUi} className="cardUi clearfix">
    //   <div className="col-lg-12" style={styles.cardTitle}>
    //     {cardTitle}
    //   </div>
    //   <div>{children}</div>
    // </div>
  );
};

export default CardUi;
