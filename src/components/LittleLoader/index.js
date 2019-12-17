import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';

import './loader.css';

export default class LittleLoader extends Component {
  render() {
    return (
      <Grid className="little-loader" container justify="center" alignItems="center">
        <Grid item>
          <CircularProgress size={32} />
        </Grid>
      </Grid>
    );
  }
}
