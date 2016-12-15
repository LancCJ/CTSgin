/**
 * Created by lanccj on 16/12/14.
 */
import * as ActionTypes from '../actions/ActionTypes';

const initialState={
    state: null,//state签到状态
    msg:null,
    rank:null
};

export default function signState(state=initialState,action={}){
    switch(action.type) {
        case ActionTypes.SIGN_STATE:
            return Object.assign({}, state, {
                state:action.state
            });
        case ActionTypes.SIGN_PHOTO1:
            return Object.assign({}, state, {
                msg:action.msg
            });
        case ActionTypes.SIGN_PHOTO2:
            return Object.assign({}, state, {
                msg:action.msg
            });
        case ActionTypes.SIGN_PHOTO3:
            return Object.assign({}, state, {
                msg:action.msg
            });
        case ActionTypes.SIGN_INFO:
            return Object.assign({}, state, {
                msg:action.msg
            });
        case ActionTypes.SIGN_DONE:
            return Object.assign({}, state, {
                msg:action.msg
            });
        //切莫忘记default返回值
        default:
            return state;
    }
}
