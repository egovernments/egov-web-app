import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function AboutCard(props) {
  const { classes,className } = props;
  return (

        <Card className={className}>
      
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            About
          </Typography>
          <Typography gutterBottom variant="h3" component="h1">
            National Urban Stack
          </Typography>
          <Typography gutterBottom variant="h4" component="h2">
          This is Photoshop's version of Lorem Ipsum. 
          Proin gravida nibh vel velit auctor aliquet.
          Aenean sollicitudin
          </Typography>
          <Typography component="p">
          This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
           Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. 
           Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.
           Nam nec tellus a odio tincidunt auctor a ornare odio.
           </Typography>
           <Typography component="p">


           </Typography>

        </CardContent>
      
     </Card>
  );
}

AboutCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(AboutCard);
