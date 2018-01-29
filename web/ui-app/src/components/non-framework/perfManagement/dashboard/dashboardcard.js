import React, { Component } from 'react';
import { Card, CardText, CardMedia, CardHeader } from 'material-ui/Card';
import { translate } from '../../../common/common';

const style = {
  card: {
    position: 'relative',
    margin: '20px',
    height: '200px',
    width: '200px',
    float: 'left',
  },
  cardheader: {
    padding: '0px',
    position: 'absolute',
    top: '0px',
    width: '100%',
    height: '5px',
  },
  cardmedia: {
    position: 'relative',
    height: '80px',
    width: '80px',
    marginLeft: '60px',
    marginTop: '20px',
  },
  cardtext: {
    position: 'absolute',
    fontSize: '18px',
    height: '80px',
    textAlign: 'center',
    marginTop: '10px',
    width: '100%',
  },
};

export default class DashboardCard extends Component {
  handleOnClick = () => {
    this.props.onClick(this.props.index);
  };

  getRandomColor(str) {
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    let color = Math.floor(Math.abs(((Math.sin(hash) * 10000) % 1) * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  }

  render() {
    style.cardheader['backgroundColor'] = this.getRandomColor(this.props.name);

    return (
      <div>
        <Card style={style.card} onClick={this.handleOnClick}>
          <CardHeader style={style.cardheader} title="" />
          <CardMedia style={style.cardmedia}>
            <img src={this.props.logo} alt="" />
          </CardMedia>
          <CardText style={style.cardtext}> {this.props.name} </CardText>
        </Card>
      </div>
    );
  }
}
