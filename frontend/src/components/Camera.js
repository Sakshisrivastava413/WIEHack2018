import React, { Component } from "react";
import Webcam from 'react-webcam';


import Paper from '@material-ui/core/Paper';

class App extends Component {

  setRef = webcam => {
    this.webcam = webcam;
  };
  // Save base64 image to disk
  capture = () => {
    let image = this.webcam.getScreenshot();

    if (!image) return;
    image = image.split('png;base64,')[1]
    console.log(image)
const emotionData = [];
    fetch(
      'http://localhost:4000/api/image_analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image })
      }
    ).then(res => res.json())
    .then(res => {console.log(res)
    

    
        for (let [key, value] of Object.entries(res.facial_emotion)) {
          emotionData.push({ tag: key, score:value });
          console.log(emotionData);
        }}).catch(err => console.log(err))
  

  this.setState({
    'emotionData': emotionData
  })
}

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <div className="box">
        <Paper
          elevation={5}
          style={{ padding: 20 }}>
          <Webcam
            style={{ maxWidth: '100%', maxHeight: 250 }}
            ref={this.setRef}
            screenshotFormat="image/png"
            width={440}
            videoConstraints={videoConstraints}
          />
        </Paper>
        {/* <button onClick={this.capture}>Capture photo</button> */}
        {/* <img src={this.imageSrc} /> */}
      </div>
    );
  }
}

export default App;
