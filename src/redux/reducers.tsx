// reducers take in previous store state and based on dispatched action
// returns a new store state.
// the reducer function is called each time an action is dispatched using
// dispatch object provided by redux.


import {ActionTypes} from './actions';
import {MESSAGE_1, UPDATE_RESULTS, UPDATE_INPUT} from './types'
import {AppState, initialState} from './store';


// reducer function
export default function reducer(prevStoreState:AppState=initialState, action:ActionTypes) {
    switch (action.type) {
        case MESSAGE_1:
            return {
                ...prevStoreState,
            }
        case UPDATE_RESULTS:
            return {
                ...prevStoreState,
                resultsList: action.resultsList
            }
        case UPDATE_INPUT:
            return {
                ...prevStoreState,
                claimInput: action.input
            }
        default:
            return prevStoreState
    }
}