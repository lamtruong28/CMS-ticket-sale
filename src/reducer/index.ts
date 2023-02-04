import { IActionReducer, IServicePack } from "~/interface";
import { types } from "~/types";

const reducer = (state: IServicePack, action: IActionReducer): IServicePack => {
    switch (action.type) {
        case types.INPUT_CHANGE:
        case types.DROPDOWN_CHANGE:
        case types.DATE_PICKER_CHANGE:
        case types.TIME_PICKER_CHANGE:
            return { ...state, [action.key]: action.payload };
        case types.COMBO_BOX_CHANGE:
            const copyState: any = { ...state };
            return {
                ...copyState,
                [action.key]: {
                    ...copyState[action.key],
                    checked: action.payload,
                },
            };
        case types.PRICE_CHANGE:
            const copyState2: any = { ...state };
            return {
                ...state,
                [action.key]: {
                    ...copyState2[action.key],
                    price: action.payload,
                },
            };
        case types.QUANTITY_CHANGE:
            return {
                ...state,
                combo: {
                    ...state.combo,
                    quantity: action.payload,
                },
            };
        case types.RESET_STATE:
            return action.payload;
        default:
            console.log("Type is not defined");
            return state;
    }
};

export default reducer;
