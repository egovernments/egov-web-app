import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import Webcam from 'react-webcam';
import {ImageUploadField,UploadField} from 'react-image-file';
import img from '../images/OpenCamera.png'
import FlatButton from 'material-ui/FlatButton';


// FileInput = require('react-file-input');
export default class FilePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      selected:true,

    }
  }
  //   this.onPick = this.onPick.bind(this)
  // }
  //
  // onPick(image) {
  //   this.setState({image})
  // }
  setRef = (webcam) => {
      this.webcam = webcam;
    }

    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      console.log(imageSrc);
      this.setState({
        file:imageSrc,
        selected:true,
      })
    };
    openWebcam = () =>{
      this.setState({
        selected:false,

      })
    }

     handleFileChange=(event) => {
       console.log(event.target.files[0]);
       let input=event.target;
       if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload =  (e) => {
            //$('#blah').attr('src', e.target.result);
          let   source=e.target.result;
             this.setState({
                       file:source,
                     })
        }

     reader.readAsDataURL(input.files[0]);

    }


    }

  render() {
    let { browse,capture }=this.props;
    return (
      <div>
       {this.state.selected?<div>
         <img src={this.state.file}  width="350"/>
         {capture?<FlatButton label="TakePhoto" icon={<img src={img}  width="35" />}primary={true} onClick={this.openWebcam}/>:
         <div>
         <input id='file1' type='file' onChange={this.handleFileChange} accept="image/x-png,image/gif,image/jpeg"
         capture style={{display:'none'}}/>
         <FlatButton icon={<label for='file1'><img src={img}  width="35" /></label>}primary={true}/>
       </div>}
         </div>:
       <div>
       <Webcam
         audio={false}
        screenshotFormat="image/jpeg"
        ref={this.setRef}
        width='90%'
         />
        <button onClick={this.capture}>Capture photo</button>
        </div>}
     </div>
    )
  }
}
