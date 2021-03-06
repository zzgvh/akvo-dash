import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import library from './library';
import collections from './collections';
import activeModal from './activeModal';

function user(state = {}, action) {
  switch (action.type) {
    default: return state;
  }
}

const rootReducer = combineReducers({
  routing: routerReducer,
  library,
  collections,
  activeModal,
  user,
});

export default rootReducer;
