import { combineReducers } from 'redux';
import topReducer, { ITopState } from './top/top.reducer';

export interface IRootState {
  top: ITopState;
}

const reducer = combineReducers<IRootState>({
  top: topReducer
});

export default reducer;
