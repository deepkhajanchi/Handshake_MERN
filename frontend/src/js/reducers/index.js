import { combineReducers } from 'redux';
import studentReducer from '../reducers/studentReducers';

const rootReducer = combineReducers({
    schools: studentReducer
})

export default rootReducer;
