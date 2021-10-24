const redux = require('redux');
const createStore = redux.createStore;

// [Initital State]
const initialState = {
  loading: false,
  users: [],
  error: ''
}

// [Action Type]
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// [Action Creator]
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// [Reducer]
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

// [store]
const store = createStore(reducer);