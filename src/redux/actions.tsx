import {MESSAGE_1, MESSAGE_2, UPDATE_RESULTS} from './types';

export interface Action1 {
    type: typeof MESSAGE_1
    payload: Object
}

export interface Action2 {
    type: typeof MESSAGE_2
    payload: Object
}

export interface UpdateResults {
    type: UPDATE_RESULTS,
    resultsList: string[][]
}


export type ActionTypes = Action1 | Action2 | UpdateResults