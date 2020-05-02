import axios from 'axios';

export function overallDataService() {
  return axios.get(
    ' https://covid19.mathdro.id/api',
    {}
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     params: { pkId: id, openAmount, shipTo },
    //   }
  );
}

export function commonService(url) {
  return axios.get(
    url,
    {}
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     params: { pkId: id, openAmount, shipTo },
    //   }
  );
}

export function detailService(data) {
  return axios.get(
    `https://covid19.mathdro.id/api/${data}`,
    {}
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     params: { pkId: id, openAmount, shipTo },
    //   }
  );
}

export function contrySpecificDetailService(country) {
  return axios.get(
    `https://covid19.mathdro.id/api/countries/${country}`,
    {}
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     params: { pkId: id, openAmount, shipTo },
    //   }
  );
}
