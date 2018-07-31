import { Action } from 'redux';

export type Actions = ISetHogeIdAction;

export interface ISetHogeIdAction extends Action {
  type: 'SET_HOGE_ID';
  payload: string;
}
export const setHogeId = (id: string): ISetHogeIdAction => ({
  type: 'SET_HOGE_ID',
  payload: id
});
