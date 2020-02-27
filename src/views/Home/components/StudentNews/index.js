import React, { Component, Text } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../theme';

import user from '../../../../services/user';
//import NewsItem from './components/NewsItem';

export default class StudentNews extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    //   this.onCancel = this.onCancel.bind(this);

    this.state = {
      newsItems: [], // A list of the news items
      open: false,
    };
  }
  componentWillMount() {
    this.loadNews();
  }

  async loadNews() {
    let newsItems;
    // Need to wait for backend to be constructed to call this function
    // newsItems = await user.getStudentNews();
    newsItems = ['hello', 'this is nees', 'more news'];
    this.setState({ newsItems });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let show;
    let newsItem;
    let newsPanel;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
    const button = {
      color: gordonColors.primary.cyan,
    };

    if (this.state.open === false) {
      show = 'Show';
    } else {
      show = 'Hide';
    }

    // For each news item, render NewsItem component
    // which will render the individual news piece
    newsItem = this.state.newsItems.map(newsItem => (
      // <NewsItem newsItem={newsItem} />
      <Text> {newsItem} </Text>
    ));

    //If no news, don't render any NewsItem components
    if (this.state.newsItems.length === 0) {
      newsPanel = '';
    } else {
      newsPanel = (
        <Grid item>
          <Grid container spacing={8} direction="column">
            <Grid item>
              <Typography variant="h6">Student News</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {newsItem}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    return (
      <Card>
        <Grid item>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                STUDENT NEWS
              </Typography>
            </div>
          </Card>
        </Grid>
        <CardContent>
          <Grid container direction="column" spacing={8}>
            {newsPanel}
            <Grid item xs={12} sm={12}>
              <Grid container alignItems="baseline" direction="row" spacing={8}>
                <Grid item>
                  <Typography variant="subtitle1">Requests Sent </Typography>
                </Grid>
                <Grid item>
                  <Button size="small" style={button} onClick={this.handleExpandClick}>
                    {show}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
