import React, { Component } from 'react';
import {
  detailService,
  contrySpecificDetailService,
} from '../../services/services';
import { NativeSelect, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    marginTop: '5vw',
    marginBottom: '2vw',
    minWidth: 275,
    width: '50px',
    backgroundColor: '#BDBDBD',
    boxShadow: '5px 10px #424242',
  },
  gridItem: {
    margin: '15px',
  },
  gridContainerParent: {
    border: '2px',
    backgroundColor: '#BDBDBD',
    boxShadow: '5px 10px #424242',
    borderRadius: '5px',
  },
  divider: {
    backgroundColor: 'white',
    height: '2px',
  },
});

class CountryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,
      option: null,
      countryData: null,
    };
  }

  handleOptionChange = (event) => {
    this.setState({ option: event.target.value });
    console.log('OPT', event.target.value);
    contrySpecificDetailService(event.target.value).then((resp) => {
      console.log('DATA', resp);
      this.setState({
        countryData: resp.data,
      });
    });
  };

  render() {
    const { classes, data } = this.props;
    var date;
    if (this.state.countryData) {
      date = new Date(this.state.countryData.lastUpdate);
      console.log(date.toDateString(), date);
    }
    return (
      <div style={{ textAlign: 'right' }}>
        {data ? (
          <div style={{ display: 'grid', justifyContent: 'center' }}>
            <FormControl className={classes.formControl}>
              <NativeSelect defaultValue="0" onChange={this.handleOptionChange}>
                <option value="0">Select Country</option>
                {data.countries.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            {this.state.countryData ? (
              <div>
                <br />
                <br />

                <Grid
                  container
                  justify="center"
                  spacing={2}
                  style={{
                    display: this.state.option == 0 ? 'none' : '',
                    marginBottom: '10px',
                  }}
                >
                  <Grid
                    item
                    container
                    justify="center"
                    spacing={2}
                    className={classes.gridItem}
                  >
                    <Card className={classes.root}>
                      <CardContent>
                        <Grid item className={classes.gridItem}>
                          <Typography
                            variant="h4"
                            justify="center"
                            color="textPrimary"
                            style={{ marginLeft: '2vw' }}
                          >
                            {this.state.option}
                          </Typography>
                        </Grid>
                        <Divider variant="middle" className={classes.divider} />
                        <Grid item className={classes.gridItem}>
                          <Typography variant="h5" component="h2">
                            Confirmed
                          </Typography>
                          <Typography variant="h6">
                            <br />
                            <CountUp
                              start={0}
                              end={this.state.countryData.confirmed.value}
                            />
                          </Typography>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                          <Typography variant="h5" component="h2">
                            Recovered
                          </Typography>
                          <Typography variant="h6" component="p">
                            <br />
                            <CountUp
                              start={0}
                              end={this.state.countryData.recovered.value}
                            />
                          </Typography>
                        </Grid>
                        <Grid item className={classes.gridItem}>
                          <Typography variant="h5" component="h2">
                            Deceased
                          </Typography>
                          <Typography variant="h6" component="p">
                            <br />
                            <CountUp
                              start={0}
                              end={this.state.countryData.deaths.value}
                            />
                          </Typography>
                        </Grid>
                        <Divider variant="middle" className={classes.divider} />
                        <Grid item className={classes.gridItem}>
                          {' '}
                          <Typography>
                            Last Updated : {date.toString()}
                            {/* {date.toDateString()} */}
                          </Typography>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <h1></h1>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

// export default CountryPicker;
export default withStyles(styles, { withTheme: true })(CountryPicker);
