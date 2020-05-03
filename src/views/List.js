import React, { Component } from 'react';
import { commonService } from '../services/services';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  table: {
    minWidth: 300,
    maxHeight: 620,
    width: '500px',
  },
  root: {
    backgroundColor: 'blue',
    height: '100%',
  },
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      stateNo: null,
      expand: false,
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    commonService('https://api.covid19india.org/state_district_wise.json').then(
      (resp) => {
        this.setState({
          data: Object.entries(resp.data),
        });
      }
    );
  }

  countActive(data) {
    var dist = Object.entries(data);

    var active = 0;
    for (var i = 0; i < dist.length; i++) {
      active += dist[i][1].active;
    }

    return active;
  }

  countConfirmed(data) {
    var dist = Object.entries(data);

    var confirmed = 0;
    for (var i = 0; i < dist.length; i++) {
      confirmed += dist[i][1].confirmed;
    }

    return confirmed;
  }

  countRecovered(data) {
    var dist = Object.entries(data);

    var recovered = 0;
    for (var i = 0; i < dist.length; i++) {
      recovered += dist[i][1].recovered;
    }

    return recovered;
  }

  countDeceased(data) {
    var dist = Object.entries(data);

    var deceased = 0;
    for (var i = 0; i < dist.length; i++) {
      deceased += dist[i][1].deceased;
    }

    return deceased;
  }

  render() {
    const { classes, data } = this.props;
    // var percentage = 'Data Loading.....';
    return (
      <div>
        <Grid container spacing={2}>
          {this.state.data ? (
            <div>
              <Grid item>
                <TableContainer component={Paper} className={classes.table}>
                  <Table
                    // className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>State/UT</StyledTableCell>
                        <StyledTableCell align="right">
                          Confirmed
                        </StyledTableCell>
                        <StyledTableCell align="right">Active</StyledTableCell>
                        <StyledTableCell align="right">
                          Recovered
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Deceased
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
                {/* <TableBody> */}
                <Grid container className={classes.table}>
                  {this.state.data.map((state, index) => (
                    <Grid item>
                      <ExpansionPanel>
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <TableContainer
                            component={Paper}
                            style={{ width: '100%' }}
                          >
                            <Table
                              // className={classes.table}
                              stickyHeader
                              aria-label="sticky table"
                            >
                              <TableBody>
                                <StyledTableRow key={index}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    style={{
                                      width: '27%',
                                    }}
                                  >
                                    {state[0]}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: '8%' }}
                                  >
                                    {this.countConfirmed(state[1].districtData)}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: '24%' }}
                                  >
                                    {this.countActive(state[1].districtData)}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: '27%' }}
                                  >
                                    {this.countRecovered(state[1].districtData)}
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ width: '20%' }}
                                  >
                                    {this.countDeceased(state[1].districtData)}
                                  </TableCell>
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <TableContainer
                            component={Paper}
                            className={classes.table}
                          >
                            <Table
                              // className={classes.table}
                              stickyHeader
                              aria-label="sticky table"
                            >
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>District</StyledTableCell>
                                  <StyledTableCell align="right">
                                    Confirmed
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    Active
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    Recovered
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    Deceased
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(state[1].districtData).map(
                                  (dist) => (
                                    <StyledTableRow>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {dist[0]}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {dist[1].confirmed}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {dist[1].active}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {dist[1].recovered}
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                        {dist[1].deceased}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                    // </TableBody>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </div>
          ) : (
            <div style={{ width: '100%', marginLeft: '37%', marginTop: '60%' }}>
              <CircularProgress color="primary" size={100} />
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

// export default List;
export default withStyles(styles, { withTheme: true })(List);
