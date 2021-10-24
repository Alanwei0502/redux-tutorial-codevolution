// npm install axios: requests to an API end point
// npm install redux-thunk: define async action creators, middleware

const redux = require('redux');
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

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

// [thunk middleware action creator]: it does have to be pure, can have side effect
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the array of users
        const users = response.data.map(user => user.id);
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error description
        dispatch(fetchUsersFailure(error.message));
      })
  }
}


// [store]
const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());