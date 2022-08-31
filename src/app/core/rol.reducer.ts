import { Action, createReducer, on , State} from '@ngrx/store';
import { asignar , limpiar} from './rol.actions';
//import {asignar , limpiar} from 'rol.ac'
export const initialState = "";

const _rolReducer = createReducer(initialState,
    on(asignar,( state, { rol }) => rol),
    on(limpiar,state => "")
    );

export function  rolReducer(state = initialState, action:Action){
    return _rolReducer(state,action);
}