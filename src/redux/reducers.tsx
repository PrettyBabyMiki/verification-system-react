// reducers take in previous store state and based on dispatched action
// returns a new store state.
// the reducer function is called each time an action is dispatched using
// dispatch object provided by redux.


import {ActionTypes} from './actions';
import {MESSAGE_1, MESSAGE_2, UPDATE_RESULTS} from './types'
import {AppState, initialState} from './store';


// reducer function
export default function reducer(prevStoreState:AppState=initialState, action:ActionTypes) {
    console.log("reducer.prevStoreState", prevStoreState);
    console.log("reducer.action", action);
    switch (action.type) {
        case MESSAGE_1:
            console.log("MESSAGE_1");
            return {
                ...prevStoreState,
            }
        case UPDATE_RESULTS:
            console.log("UPDATE RESULTS...");
            return {
                ...prevStoreState,
                resultsList: action.resultsList
            }
        default:
            return prevStoreState
    }
}