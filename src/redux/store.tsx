import {createStore, combineReducers} from 'redux';
import rootReducer from './reducers';


export interface AppState {
    showMessage: false;
    resultsList: string[][];
    claimInput: string;
}

export const initialState: AppState = {
    showMessage: false,
    resultsList: [['']],
    claimInput: '',
}

const store = createStore(rootReducer, initialState);

export default store;