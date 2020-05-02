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

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gridContainerParent: {
    border: '2px',
    backgroundColor: '#BDBDBD',
    boxShadow: '5px 10px #424242',
    borderRadius: '5px',
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
                <option value="0">Global</option>
                {data.countries.map((country, i) => (
                  <option key={i} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            {this.state.countryData ? (
              <div>
                {/* //   <h1>{this.state.countryData.confirmed.value} */}
                <br />
                <br />

                <Grid
                  container
                  justify="center"
                  spacing={2}
                  className={classes.gridContainerParent}
                  style={{
                    display: this.state.option == 0 ? 'none' : '',
                  }}
                >
                  <Grid item>
                    <Typography variant="h4">{this.state.option}</Typography>
                  </Grid>
                  <Grid item container justify="center" spacing={10}>
                    <Grid item>
                      <Typography variant="h4">Confirmed Cases</Typography>
                      <Typography>
                        <br />
                        <CountUp
                          start={0}
                          end={this.state.countryData.confirmed.value}
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4">Recovered</Typography>
                      <Typography>
                        <br />
                        <CountUp
                          start={0}
                          end={this.state.countryData.recovered.value}
                        />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h4"> Deaths</Typography>
                      <Typography>
                        <br />
                        <CountUp
                          start={0}
                          end={this.state.countryData.deaths.value}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <br />
                </Grid>
                <div
                  style={{
                    display: 'inline',
                    alignItems: 'right',
                    display: this.state.option == 0 ? 'none' : 'block',
                  }}
                >
                  <br />
                  <Typography>
                    Last Updated : {date.toString()}
                    {/* {date.toDateString()} */}
                  </Typography>
                </div>
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
