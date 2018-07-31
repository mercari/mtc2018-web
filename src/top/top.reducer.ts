import { Actions } from './top.actions';

export interface ITopState {
  hogeId: string;
}

const initialState: ITopState = {
  hogeId: '1234'
};

const topReducer = (state: ITopState = initialState, action: Actions) => {
  switch (action.type) {
    case 'SET_HOGE_ID':
      return {
        ...state,
        hogeId: action.payload
      };
    default:
      return state;
  }
};

export default topReducer;
