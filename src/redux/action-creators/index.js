import axios from 'axios';

const API_URL = 'http://api.haochuan.io/emails';

const requestStart = () => {
  return {
    type: 'REQUEST_DATA_START'
  };
};

const requestSuccess = response => {
  return {
    type: 'REQUEST_DATA_SUCCESS',
    data: response
  };
};

const requestFail = error => {
  return {
    type: 'REQUEST_DATA_FAIL',
    error
  };
};

export const getEmailData = () => {
  return (dispatch) => {
    dispatch(requestStart());
    axios
      .get(API_URL)
      .then(res => {
        dispatch(requestSuccess(res.data.emailData));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export const getCurrentTag = (tag) => {
  return {
    type: 'GET_CURRENT_TAG',
    currentTag: tag
  };
};

export const getEmailId = (id) => {
  return {
    type: 'GET_EMAIL_ID',
    id
  };
};

export const readEmail = (id) => {
  return {
    type: 'READ_EMAIL',
    id
  }; 
};

export const deleteEmail = (id) => {
  return {
    type: 'DELETE_EMAIL',
    id
  };
};