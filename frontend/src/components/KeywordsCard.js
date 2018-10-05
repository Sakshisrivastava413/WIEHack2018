import React, { Component } from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class KeywordsCards extends Component {
  render() {
    return (
      <div className="box" style={{ textAlign: 'center' }}>
        <Paper elevation={5} style={{ padding: 20 }}>
          <Typography variant="display1" style={{ marginBottom: 20 }}>
            Keywords
          </Typography>
          {
            this.props.list.length ? this.props.list.map((item, i) => {
              return (
                <Typography variant="title" key={i} style={{ marginBottom: 4 }}>
                  - {item.keyword}
                </Typography>
              )
            }) :
            <Typography variant="headline" >
              No keywords found
            </Typography>
          }
        </Paper>
      </div>
    );
  }
}

export default KeywordsCards;
