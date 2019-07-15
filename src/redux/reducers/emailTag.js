const initState = 'inbox';

const emailTag = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_TAG':
      return action.currentTag;
    default:
      return state;
  }
};

export default emailTag;
