import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Autorenew from '@material-ui/icons/Autorenew';
import { gordonColors } from '../../../../theme';
import GordonLoader from '../../../../components/LittleLoader';
import './verseBox.css';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class VerseOfTheDay extends Component {
  constructor(props) {
    super(props);

    this.loadVerse = this.loadVerse.bind(this);

    this.state = {
      error: null,
      loading: true,
      verse: null,
      book: null,
      reference: null,
    };
  }
  componentDidMount() {
    this.loadVerse();
  }

  // Loads a random verse from the ourmanna verse API
  async loadVerse() {
    // Displays Gordon loader while fetching verse
    this.setState({ loading: true });
    //console.log('TRUE');
    try {
      fetch('https://beta.ourmanna.com/api/v1/get/?format=json&order=random')
        .then(response => {
          return response.json();
        })
        .then(result => {
          console.log(result);
          this.setState({
            verse: result.verse.details.text,
            book: result.verse.details.version,
            reference: result.verse.details.reference,
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    let title;

    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      // Formats verse with correct quotations
      // Double quotes of any direction should be changed to single
      content =
        '“' +
        this.state.verse
          .replace(/"/g, "'")
          .replace(/“/g, "'")
          .replace(/”/g, "'") +
        '”';
      title = this.state.reference + ' (' + this.state.book + ')';
    }

    // Styling used for reload button to retrieve a new verse
    const style = {
      button: {
        color: gordonColors.primary.cyan,
      },
    };

    let verseBox;

    // This if/else structure will be used to make the verse a collapsible card on mobile
    if (true) {
      verseBox = (
        <Grid item xs={12} md={10}>
          <Card>
            <CardContent id="verse">
              <Grid container direction="row" alignItems="center">
                <Grid item xs={10} align="left">
                  <CardHeader id="title" title={title} />
                </Grid>
                <Grid item xs={2} align="right">
                  <Autorenew
                    fontSize="large"
                    style={style.button}
                    onClick={() => this.loadVerse()}
                  />
                  {/* <Button variant="outlined" style={style.button} onClick={() => this.loadVerse()}>
                    New Verse
                  </Button> */}
                </Grid>
              </Grid>
              {content}
            </CardContent>
          </Card>
        </Grid>
      );
    } else {
      verseBox = (
        <Card>
          <CardContent id="verse">
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} align="left">
                <CardHeader id="title" title={title} />
              </Grid>
              <Grid item xs={5} align="right">
                <Button variant="contained" style={style.button} onClick={() => this.loadVerse()}>
                  Old Verse
                </Button>
              </Grid>
            </Grid>
            {content}
          </CardContent>
        </Card>
      );
    }
    return verseBox;
  }
}
