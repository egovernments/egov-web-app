import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { translate } from '../../common/common';

export default class UiSingleFileUpload extends Component {
  constructor(props) {
    super(props);
  }

  renderSingleFileUpload = item => {
    switch (this.props.ui) {
      case 'google':
      if (item.readonly && item.optionForNew) {
        let {getVal}  = this.props;
        let fileId =  getVal(item.jsonPath);
       return (
         <div>
       {(fileId) ?  
       <div>
             <a
                href={
                  window.location.origin +
                  '/filestore/v1/files/id?tenantId=' +
                  localStorage.tenantId +
                  '&fileStoreId=' +
                  fileId
                }
                target="_blank"
              >
                {translate(item.label)}
              </a>
              <p style={{margin:'5px 0px 5px 20%'}}>{"OR"}</p>
           </div> : ''
          } 

           <div
             style={{
               marginTop: '0px',
               display: item.hide ? 'none' : 'inline-block',
             }}
           >
             <input
               id={item.jsonPath.split('.').join('-')}
               disabled={item.isDisabled}
               type="file"
               accept=".doc,.docx,.xls,.xlsx,.csv,.pdf,.jpeg,.jpg,.png"
               style={{ marginTop: '0px' }}
               onChange={e =>
                 this.props.handler(
                   { target: { value: e.target.files[0] } },
                   item.jsonPath,
                   item.isRequired ? true : false,
                   '',
                   item.requiredErrMsg,
                   item.patternErrMsg,
                   item.hidePrevious=true
                 )
               }
             />
           </div>
         </div>
       );
     }else if (item.readonly) {
       let {getVal}  = this.props;
       let fileId =  getVal(item.jsonPath);
       console.log("File store Id Value Is", fileId);
          return (
            (fileId) ?
            <a
              href={
                window.location.origin +
                '/filestore/v1/files/id?tenantId=' +
                localStorage.tenantId +
                '&fileStoreId=' +
                fileId
              }
              target="_blank"
            >
              {translate(item.label)}
            </a> : <p>{"No documents"}</p>
          );
        } else {
          /*
          <RaisedButton
            floatingLabelStyle={{"color": "#696969"}}
            style={{"display": (item.hide ? 'none' : 'block')}}
            containerElement='label'
            fullWidth={true}
            value={this.props.getVal(item.jsonPath)}
            disabled={item.isDisabled}
            label={item.label}>
              <input id={item.jsonPath.split(".").join("-")}   type="file" style={{ display: 'none' }} onChange={(e) => this.props.handler({target:{value: e.target.files[0]}}, item.jsonPath, item.isRequired ? true : false, '', item.requiredErrMsg, item.patternErrMsg)}/>
          </RaisedButton>
        */
          return (
            <div
              style={{
                marginTop: '17px',
                display: item.hide ? 'none' : 'inline-block',
              }}
            >
              <label>
                {item.label} <span style={{ color: '#FF0000' }}>{item.isRequired ? ' *' : ''}</span>
              </label>
              <br />
              <input
                id={item.jsonPath.split('.').join('-')}
                disabled={item.isDisabled}
                type="file"
                accept=".doc,.docx,.xls,.xlsx,.csv,.pdf,.jpeg,.jpg,.png"
                style={{ marginTop: '10px' }}
                onChange={e =>
                  this.props.handler(
                    { target: { value: e.target.files[0] } },
                    item.jsonPath,
                    item.isRequired ? true : false,
                    '',
                    item.requiredErrMsg,
                    item.patternErrMsg
                  )
                }
              />
            </div>
          );
        }
    }
  };

  render() {
    return <div>{this.renderSingleFileUpload(this.props.item)}</div>;
  }
}
