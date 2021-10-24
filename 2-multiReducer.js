// node version is 14, which is according to CommonJS and cannot use 'import' syntax.
// If you'd like to use 'import' syntax, kindly insert: "type": "module" in package.json
// import { createStore, combineReducers } from 'redux';
// import { reduxLogger } from 'redux-logger';


import { createStore, combineReducers } from 'redux';
// const redux = require('redux');
// const createStore = redux.createStore;
// const combineReducers = redux.combineReducers;


// [ACTION]
// type: a string to descibe the action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

// Action Creator: A function that return action
function buyCake(cakeNumber) {
  // Action: an object with the "type" property
  return {
    type: BUY_CAKE,
    cakeNumber,
  }
}
function buyIceCream(iceCreamNumber) {
  return {
    type: BUY_ICE_CREAM,
    iceCreamNumber,
  }
}


// [REDUCER]
// Once the store is built, it will call reducer first. So we need initialState here.
// const initialState = {
//   numberOfCakes: 10,
//   numberOfIceCreams: 20
// }

const initialCakeState = {
  numberOfCakes: 10,
}

const initialIceCreamState = {
  numberOfIceCreams: 20
}

// A function that accepts state and action as arguments, and return the next state of the application
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numberOfCakes: state.numberOfCakes - action.cakeNumber,
//       }
//       case BUY_ICE_CREAM:
//       return {
//         ...state,
//         numberOfIceCreams: state.numberOfIceCreams - action.iceCreamNumber,
//       }
//     default:
//       return state
//   }
// }

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - action.cakeNumber,
      }
    default:
      return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - action.iceCreamNumber,
      }
    default:
      return state
  }
}


// [STORE]
// 1. Holds application state
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
const store = createStore(rootReducer);

// 2. Allows access to state via getState()
console.log('Initial state', store.getState());

// 3. Register listeners via subscribe(listener)
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));

// 4. Allow state to be updated via dispatch(action)
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));
store.dispatch(buyCake(3));
store.dispatch(buyIceCream(3));

// 5. Handles unregistering of listeners via the function returned by subscribe(listener)
unsubscribe();
store.dispatch(buyCake(4));
