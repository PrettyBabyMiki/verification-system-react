import {createStore, combineReducers} from 'redux';
import rootReducer from './reducers';


export interface AppState {
    showMessage: false;
    resultsList: string[][]
}

export const initialState: AppState = {
    showMessage: false,
    resultsList: [['']]
}

const store = createStore(rootReducer, initialState);

export default store;