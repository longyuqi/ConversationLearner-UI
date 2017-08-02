import { ActionObject } from '../types'
import { TrainDialogState } from '../types'
import { AT } from '../types/ActionTypes'
import { TrainDialog } from 'blis-models'
import { Reducer } from 'redux'

const initialState: TrainDialogState = {
    all: [],
    current: null
};

const trainDialogsReducer: Reducer<TrainDialogState> =  (state = initialState, action: ActionObject) => {
    switch (action.type) {
        case AT.LOGOUT:
            return { ...initialState };
        case AT.FETCH_TRAIN_DIALOGS:
            return { ...state, all: action.allTrainDialogs };
        case AT.EMPTY_STATE_PROPERTIES: 
            return {...state, all: []};
        case AT.CREATE_TRAIN_DIALOG:
            return { ...state, all: [...state.all, action.trainDialog], current: action.trainDialog };
        case AT.SET_CURRENT_TRAIN_DIALOG:
            return { ...state, current: action.currentTrainDialog };
        case AT.TOGGLE_TRAIN_DIALOG:
            let index: number = 0;
            for (let i = 0; i < state.all.length; i++) {
                if (state.all[i].trainDialogId == state.current.trainDialogId) {
                    index = i
                }
            }
            if (index == 0) {
                if (action.forward === false) {
                    return { ...state, current: state.all[state.all.length - 1] }
                }
            }
            if (index == state.all.length - 1) {
                if (action.forward === true) {
                    return { ...state, current: state.all[0] }
                }
            }
            let newState: TrainDialogState;
            if (action.forward === true) {
                newState = { ...state, current: state.all[index + 1] }
            } else {
                newState = { ...state, current: state.all[index - 1] }
            }
            return newState;
        case AT.DELETE_TRAIN_DIALOG:
        // return [...state, action.payload];
        case AT.EDIT_TRAIN_DIALOG:
        // return [...state, action.payload];
        default:
            return state;
    }
}
export default trainDialogsReducer;