import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
//import imgUrl from "../../../../assets/shree.jpg";
//import imgUrl from "../../../../../src/assets/jagan-Shah.jpg";
//import imgurl from "../../../../assets/manish.jpg";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  card: {
    backgroundcolor: "#FFFFFF",
    border: "0.5",
    //borderRadius: "6px",
    minWidth: "280px",
    whiteSpace: "normal",
    // margin: "16px 0px",
    paddingLeft: "15px",
    paddingTop: "0px",
    display: "flex",
    flexDirection: "row"

    // justifyContent: "right",
    // alignItems: "right"
  },
  Avatar: {
    width: "100px",
    height: "100px",
    // borderRadius: "100%",
    // justifyContent: "center",
    marginRight: "16px"
  },
  title: {
    fontSize: "14px",
    textAlign: "right",
    paddingTop: "10px",
    display: "flex",
    textAlign: "right",
    flexDirection: "row"
  },
  titlezero: {
    fontSize: "14px",
    textAlign: "left",
    display: "flex"
  },
  titleone: {
    fontSize: "14px",
    textAlign: "left",
    display: "flex",
    paddingTop: "10px"
  },
  tittletwo: {
    color: "#4A90E2",
    // paddingleft: "100px",
    paddingBottom: "20px",
    paddingRight: "25px",
    borderRight: "solid",
    width: "4px",
    height: "56px",
    margin: "0px 0px 5px 0px"
  },
  textzero: {
    fontFamily: "Montserrat",
    width: "50px",
    height: "19px",
    textAlign: "left",
    paddingLeft: "40px",
    paddingTop: "10px",
    marginTop: "10px",
    marginLeft: "10px"
  },
  textone: {
    fontSize: "29px",
    color: "#4A90E2",
    fontFamily: "Montserrat",
    width: "363px",
    height: "42px",
    paddingLeft: "40px",
    marginTop: "10px",
    marginLeft: "10px"
  }
});
class Testimonials extends React.Component {
  getItems = () => {
    const { classes } = this.props;
    return [
      {
        cardHeader: "Shri. Shiv Das Meena",
        option1: "Additional Secretary , Ministry of Housing and Urban Affairs",
        option2:
          "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” ",
        imgUrl: "/assets/images/shree.jpg"
      },
      {
        cardHeader: "Shri. Jagan Shah",
        option1: "Director, National Institute of Urban Affairs",
        option2:
          "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” ",
        imgUrl: "/assets/images/Jagan-Shah.jpg"
      },

      {
        cardHeader: "Shri. Manish Thakur",
        option1: "Joint Secretary, Ministry of Housing and Urban Affairs",
        option2:
          "“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.” ",
        imgUrl: "/assets/images/manish.jpg"
      }
    ];
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tittletwo}>
          <div
            className={classes.textzero}
            style={{
              fontSize: "16px",
              color: "black"
            }}
          >
            Testimonials
          </div>

          <div className={classes.textone}>Messages from the Leadership</div>
        </div>

        <Grid container spacing={0} className={classes.card}>
          {this.getItems().map(item => {
            return (
              <Grid item xs={4} className={classes.card} justify="left">
                <Card className={classes.card}>
                  <CardContent
                    //className={classes.avatar}
                    justify="right"
                    borderRadius="60%"
                    justifyContent="center"
                    marginRight="16px"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Avatar src={item.imgUrl} className={classes.Avatar} />
                      <div>
                        <Typography
                          className={classes.title}
                          color="#000000"
                          fontFamily="Montserrat"
                          gutterBottom
                          flexDirection="row"
                        >
                          {item.cardHeader}
                        </Typography>
                        <Typography
                          className={classes.titlezero}
                          color="textSecondary"
                          gutterBottom
                        >
                          {item.option1}
                        </Typography>
                      </div>
                    </div>

                    <Typography
                      className={classes.titleone}
                      color="textSecondary"
                      gutterBottom
                    >
                      {item.option2}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}{" "}
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Testimonials);