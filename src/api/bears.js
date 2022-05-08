import axios from 'axios';

export const bearsAPI = {
  getBears() {
    return axios
      .get('https://private-9d5e37a-testassignment.apiary-mock.com/get-bears')
      .then(response => response.data);
  },
  changeStatus(param, id) {
    return axios
      .post(`https://private-9d5e37a-testassignment.apiary-mock.com/${param}?id=${id}`)
      .then(response => response.data);
  },
};
