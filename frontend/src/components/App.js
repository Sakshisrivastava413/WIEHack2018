import React, { Component } from "react";
import 'flexboxgrid';

import RecordVoice from './RecordVoice';
import KeywordsCard from './KeywordsCard';
import Camera from './Camera';
import EmotionGraph from './EmotionGraph';
import SentimentGraph from './SentimentGraph';
import Webcam from 'react-webcam';
import Paper from '@material-ui/core/Paper';


class App extends Component {

  state = {
    emotionData: [],
    sentimentData: [{ name: '', positive: 0, negative: 0, neutral: 0 }],
    keywords: []
  }
  setRef = webcam => {
    this.webcam = webcam;
  };
   

  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     emotionData: [
    //       { value: Math.random(), name: 'sad' },
    //       { value: Math.random(), name: 'excited' },
    //       { value: Math.random(), name: 'sarcasm' },
    //       { value: Math.random(), name: 'fear' },
    //       { value: Math.random(), name: 'happy' },
    //       { value: Math.random(), name: 'bored' },
    //       { value: Math.random(), name: 'angry' },
    //     ],
    //     sentimentData: [
    //       this.state.sentimentData[this.state.sentimentData.length - 3],
    //       this.state.sentimentData[this.state.sentimentData.length - 2],
    //       this.state.sentimentData[this.state.sentimentData.length - 1],
    //       { name: '', positive: Math.random(), negative: Math.random(), neutral: Math.random() }
    //     ]
    //   })
    // }, 1500);
  }

  onSpeech = (text) => {
    fetch(
      'http://localhost:4000/api/analysis/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      }
    ).then(res => res.json())
      .then(res => {
        console.log(res);

        

        this.setState({
          'keywords': res.keywords.keywords,
          'sentimentData': [
            this.state.sentimentData[this.state.sentimentData.length - 3],
            this.state.sentimentData[this.state.sentimentData.length - 2],
            this.state.sentimentData[this.state.sentimentData.length - 1],
            res.sentiments.probabilities,
          ]

        });
      })
     
  }

  capture = () => {
    let image = this.webcam.getScreenshot();

    if (!image) return;
    image = image.split('png;base64,')[1]
    console.log(image)
// const emotionData = [];
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
      console.log(res.facial_emotion[1].score)
    const emotionData = [];
     let resp = res.facial_emotion;
    // Object.entries(resp).map(item => ({[item[0]]:item[1]}));
    // // const splitObject = (resp) => Object.keys(resp).map(e => ({ [e]: resp[e] }));
    //   console.log(this.emotionData)
    this.emotionData = JSON.parse(JSON.stringify(resp));
    console.log("data", this.emotionData)
  }).then(
  
    // for (let [key, value] of Object.entries(res.facial_emotion)) {
    //   emotionData.push({ tag: key, score: value });
    // }
    

  this.setState({
    'emotionData': this.emotionData
  }),
  console.log("changed", this.emotionData)
  )
}

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return (
      <div>
        <div className="row around-sm">
          <div className="col-sm-4" style={{ marginTop: 20 }}>
            <RecordVoice onSpeech={this.onSpeech} />
          </div>
          <div>
          
          </div>
          <div className="col-sm-4" style={{ marginTop: 20 }}>
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
        </div>
            <button onClick={this.capture}>Capture photo</button>
            </div>
        </div>
        <div className="row around-sm" style={{ height: 300 }}>
          
          <div className="col-sm-6" style={{ marginTop: 25 }}>
            <SentimentGraph sentimentData={this.state.sentimentData} />
          </div>
          <div className="col-sm-6" style={{ marginTop: 25 }}>
            <EmotionGraph emotionData={this.state.emotionData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
