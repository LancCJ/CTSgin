/**
 * Created by lanccj on 16/12/14.
 */
import * as ActionTypes from '../actions/ActionTypes';

const initialState={
    state: null//state签到状态
};

export default function signState(state=initialState,action={}){
    switch(action.type) {
        case ActionTypes.SIGN_STATE:
            return Object.assign({}, state, {
                state:action.state
            });
        //切莫忘记default返回值
        default:
            return state;
    }
}
