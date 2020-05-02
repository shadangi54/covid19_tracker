import React, { Component } from 'react';
import Cards from '../components/Cards/Cards';
import CountryPicker from '../components/CountryPicker/CountryPicker';
import { overallDataService, commonService } from '../services/services';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overallData: null,
      countries: null,
      confirmed: null,
      recovered: null,
      deaths: null,
    };
  }

  componentWillMount() {
    this.renderMyData();
  }

  renderMyData() {
    overallDataService().then((resp) => {
      this.setState({
        overallData: resp.data,
      });
      commonService(resp.data.countries).then((resp) => {
        this.setState({
          countries: resp.data,
        });
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.overallData ? (
          <div>
            {' '}
            <Cards data={this.state.overallData} />
            <CountryPicker data={this.state.countries} />
            <Link
              style={{ textDecoration: 'none', marginLeft: '44%' }}
              to={{
                pathname: '/statewise-details',
                data: this.state.countryData,
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#BDBDBD',
                  boxShadow: '5px 10px #424242',
                }}
              >
                <h4>Stats for India</h4>
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{ width: '100%', marginLeft: '37%', marginTop: '10%' }}>
            <CircularProgress color="primary" size={250} />
          </div>
        )}
      </div>
    );
  }
}

export default Main;
