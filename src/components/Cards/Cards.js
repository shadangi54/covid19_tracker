import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { overallDataService } from '../../services/services';
import CountUp from 'react-countup';

const styles = (theme) => ({
  root1: {
    fontColor: 'white',
  },
  root: {
    marginTop: '5vw',
    marginBottom: '2vw',
    minWidth: 275,
    backgroundColor: '#BDBDBD',
    boxShadow: '5px 10px #424242',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallData: null,
    };
  }

  render() {
    const { classes, data } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div classname={classes.root1}>
        {data ? (
          <Grid container justify="center" spacing={2}>
            <Grid item>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Confirmed Cases
                  </Typography>
                  <Typography variant="body2" component="p">
                    <br />
                    <CountUp start={0} end={data.confirmed.value} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Recovered
                  </Typography>
                  <Typography variant="body2" component="p">
                    <br />
                    <CountUp start={0} end={data.recovered.value} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Deaths
                  </Typography>
                  <Typography variant="body2" component="p">
                    <br />
                    <CountUp start={0} end={data.deaths.value} />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <div>
            <h1>DATA AARAHA HAI.........</h1>
          </div>
        )}
      </div>
    );
  }
}

// export default Cards;
export default withStyles(styles, { withTheme: true })(Cards);
