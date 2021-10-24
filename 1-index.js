const redux = require('redux');
const createStore = redux.createStore;


// [ACTION]
// type: a string to descibe the action
const BUY_CAKE = 'BUY_CAKE';

// Action Creator: A function that return action
function buyCake(cakeNumber) {
  // Action: an object with the "type" property
  return {
    type: BUY_CAKE,
    cakeNumber,
  }
}


// [REDUCER]
// Once the store is built, it will call reducer first. So we need initialState here.
const initialState = {
  numberOfCakes: 10
}

// A function that accepts state and action as arguments, and return the next state of the application
const reducer = (state = initialState, action) => {
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


// [STORE]
// 1. Holds application state
const store = createStore(reducer);

// 2. Allows access to state via getState()
console.log('Initial state', store.getState());

// 3. Register listeners via subscribe(listener)
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()));

// 4. Allow state to be updated via dispatch(action)
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));
store.dispatch(buyCake(3));

// 5. Handles unregistering of listeners via the function returned by subscribe(listener)
unsubscribe();
store.dispatch(buyCake(4));
