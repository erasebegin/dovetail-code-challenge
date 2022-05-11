import { SET_MOD_LIST, SET_MOD_DETAILS, SET_FAVOURITE } from "./actions";
import { combineReducers } from "redux";

const initialState = {
    modList: [],
    pagination: { pageSize: 15, numPages: 1 },
    sortFilter: "mostPopular",
    currentModDetails: null,
    favourites: [],
};

const globalState = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOD_LIST:
            return { ...state, modList: action.mods };

        case SET_MOD_DETAILS:
            return { ...state, currentModDetails: action.details };

        case SET_FAVOURITE:
            // check if favourite exists, if so remove from array
            if(state.favourites.includes(action.selectedFavourite)){
              // create new array without selectedFavourite
              const removedFavouriteArr = state.favourites.filter((fav)=>fav !== action.selectedFavourite);

              return { ...state, favourites: removedFavouriteArr };
            }
            return { ...state, favourites: [...state.favourites, action.selectedFavourite] };

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    globalState,
});

export default rootReducer;
