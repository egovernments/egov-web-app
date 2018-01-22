import React, { Component } from 'react';
import _ from 'lodash';
// import TimePicker from 'material-ui/TimePicker';
import { translate } from '../../common/common';
var DateTimeField = require('react-bootstrap-datetimepicker');
var moment = require('moment');

export default class UiTimeField extends Component {
  constructor(props) {
    super(props);
  }

  renderTimePicker = item => {
  
    var inputProps ={
                placeholder: 'hh:mm',
                id: item.jsonPath.split('.').join('-'),
                disabled: item.isDisabled,
              };

              var time = this.props.getVal(item.jsonPath) || undefined;
            
              if(_.isEmpty(this.props.getVal(item.jsonPath)) &&  item.reset){
                inputProps["value"] = "";
              }
              else{
                if(this.props.actionName === "update" && time && !(/date/.test(time))){
                  time = parseInt(time);
                  inputProps["value"] = moment(time).format("h:mm A");
                }
              };
              
             
    switch (this.props.ui) {
      case 'google':
        return (
      
          <div
            style={{
              marginTop: '17px',
              display: item.hide ? 'none' : 'inline-block',
            }}
            className="custom-form-control-for-datepicker"
          >
            <label>
              {item.label} <span style={{ color: '#FF0000' }}>{item.isRequired ? ' *' : ''}</span>
            </label>
            <br />
            <DateTimeField
              mode="time"
              dateTime={time}
              size="sm"
              inputFormat="h:mm A"
              inputProps={inputProps}
              defaultText=""
              onChange={e => {
                this.props.handler(
                  { target: { value: e } },
                  item.jsonPath,
                  item.isRequired ? true : false,
                  /\d{12,13}/,
                  item.requiredErrMsg,
                  item.patternErrMsg || translate('framework.time.error.message'),
                  item.expression,
                  item.expressionMsg,
                  true
                );
              }}
            />
            <div
              style={{
                height: '23px',
                visibility: this.props.fieldErrors && this.props.fieldErrors[item.jsonPath] ? 'visible' : 'hidden',
                position: 'relative',
                fontSize: '12px',
                lineHeight: '23px',
                color: 'rgb(244, 67, 54)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                float: 'left',
              }}
            >
              {this.props.fieldErrors && this.props.fieldErrors[item.jsonPath] ? this.props.fieldErrors[item.jsonPath] : ' '}
            </div>
          </div>
        );
    }
  };

  render() {
    return this.renderTimePicker(this.props.item);
  }
}
