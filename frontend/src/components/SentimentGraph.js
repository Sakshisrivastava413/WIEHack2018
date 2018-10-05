import React, { Component } from "react";

import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import { Tooltip as MuiTooltip } from '@material-ui/core';

import Tab from '@material-ui/icons/Tab';
import Timeline from '@material-ui/icons/Timeline';

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  AreaChart,
  Area
} from 'recharts';

class SentimentGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      graphActive: 'line'
    };
  }

  changeGraphStyle = () => {
    this.setState({ graphActive: this.state.graphActive === 'line' ? 'area' : 'line' });
  }

  renderLineGraph = () => {
    return (
      <LineChart
        width={600}
        height={300}
        data={this.props.sentimentData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="positive" stroke="#4caf50" />
        <Line type="monotone" dataKey="negative" stroke="#f44336" />
        <Line type="monotone" dataKey="neutral" stroke="#d2d2d2" />
      </LineChart>
    );
  }

  renderAreaGraph = () => {
    return (
      <AreaChart
        width={600}
        height={300}
        data={this.props.sentimentData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4caf50" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f44336" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d2d2d2" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#d2d2d2" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="positive" stroke="#4caf50" fillOpacity={1} fill="url(#colorPositive)" />
        <Area type="monotone" dataKey="negative" stroke="#f44336" fillOpacity={1} fill="url(#colorNegative)" />
        <Area type="monotone" dataKey="neutral" stroke="#d2d2d2" fillOpacity={1} fill="url(#colorNeutral)" />
      </AreaChart>
    );
  }

  render() {
    return (
      <div className="box center-sm">
        <Paper elevation={5} style={{ padding: 20 }}>
          <div className="row">
            <div className="col-sm-12">
              <div className="box">
                {
                  this.state.graphActive === 'line' ?
                    this.renderLineGraph() :
                    this.renderAreaGraph()
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="box">
                <Typography variant="headline">
                  Textual Sentimental Analysis
                  <MuiTooltip title={this.state.graphActive === 'line' ? 'Switch to area graph' : 'Switch to line graph'}>
                    <IconButton
                      variant="fab"
                      color="secondary"
                      onClick={this.changeGraphStyle}
                      size="small"
                    >
                      {
                        this.state.graphActive === 'line' ?
                          <Tab /> :
                          <Timeline />
                      }
                    </IconButton>
                  </MuiTooltip>
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default SentimentGraph;
