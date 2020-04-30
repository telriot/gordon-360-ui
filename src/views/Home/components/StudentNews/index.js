import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../theme';
import news from '../../../../services/news';

import NewsCategory from './components/NewsCategory';

export default class DailyNews extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      newsCategories: [],
    };
  }

  componentWillMount() {
   this.loadNews();
  }

  // loads the news by category
  async loadNews() {
    let newsCategories;

    newsCategories = await news.getCategories();

    this.setState({ newsCategories });
  }

  // opens or closes the expansions
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    let categories;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };

    const button = {
      color: gordonColors.primary.cyan,
    };

    categories = this.state.newsCategories
      .map(item => (
        <NewsCategory cateogry={item.categoryID} />
      ));

    return (
      <Card>
        <Grid item>
          <Card>
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <Typography variant="body2" style={headerStyle}>
                  Today's Student News
                </Typography>
              </Grid>
              <Grid item>
                <Button size="small" style={button}
                  onClick={() => (window.location.pathname = '/news')}
                  >
                    All News
                </Button>
                <Button
                variant="contained"
                color="secondary"
                style={{
                  color: 'white',
                }}
                onClick={() => {
                  window.location.pathname = '/student-news-submissions';
                }}
              >
                New Submission
              </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <CardContent>
          <Grid container direction="column" spacing={8}>
            {categories}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
