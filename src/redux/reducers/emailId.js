const initState = null;

const emailId = (state = initState, action) => {
  switch (action.type) {
    case 'GET_EMAIL_ID':
      return action.id;
    default:
      return state;
  }
};

export default emailId;
