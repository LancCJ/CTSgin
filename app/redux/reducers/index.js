import { combineReducers } from 'redux';
import login from './LoginReducer';
import signState from './SignStateReducer';
// ... other reducers

export default combineReducers({
    login,
    signState
    // ... other reducers
});