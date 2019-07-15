import { combineReducers } from 'redux';
import emailData from './emailData';
import emailTag from './emailTag';
import emailId from './emailId';

const reducers = combineReducers({
  emailData,
  emailTag,
  emailId
});

export default reducers;
