const initState = {
  isLoading: false,
  emails: [],
  error: null
};

const emailData = (state = initState, action) => {
  switch (action.type) {
    case 'REQUEST_DATA_START':
      return {
        ...state,
        isLoading: true
      };
    case 'REQUEST_DATA_SUCCESS':
      let id = 0;
      for (let email of action.data) {
        email.id = id++;
      }
      return {
        ...state,
        isLoading: false,
        emails: action.data,
        error: null
      };
    case 'REQUEST_DATA_FAIL':
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case 'READ_EMAIL':
      return {
        ...state,
        emails: [
          ...state.emails.slice(0, action.id),
          { ...state.emails[action.id], read: 'true' },
          ...state.emails.slice(action.id + 1)
        ]
      };
    case 'DELETE_EMAIL':
      return {
        ...state,
        emails: [
          ...state.emails.slice(0, action.id),
          { ...state.emails[action.id], tag: 'deleted' },
          ...state.emails.slice(action.id + 1)
        ]
      };
    default:
      return state;
  }
};

export default emailData;
