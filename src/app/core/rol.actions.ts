import { createAction , props } from '@ngrx/store';

export const asignar = createAction('[Rol] Asignar', props<{rol : string}>());

export const limpiar = createAction('[Rol] Limpiar');