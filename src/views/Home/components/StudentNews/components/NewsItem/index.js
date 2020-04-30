import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../../../theme';

// import

export default class NewsItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      open: false,
    };
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let show;

    const button = {
      color: gordonColors.primary.cyan,
    };

    if (this.state.open === false) {
      show = 'Show';
    } else {
      show = 'Hide';
    }

    return(
      <Grid container direction="column" spacing={2}>
        <br />
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs={6} sm={4} md={6} lg={4}>
              <Typography>
                {this.props.poster}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={6} lg={4} align="center">
              <Typography>{this.props.subject}</Typography>
            </Grid>
            <Grid item>
              <Button size="small" style={button} onClick={this.handleExpandClick}>
                {show}
              </Button>
            </Grid>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Grid item xs={12} sm={12}>
                {this.props.body}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
