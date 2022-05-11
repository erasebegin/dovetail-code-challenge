export const SET_MOD_LIST = "SET_MOD_LIST";
export const SET_MOD_DETAILS = "SET_MOD_DETAILS";
export const SET_FAVOURITE = "SET_FAVOURITE";

export const fetchModList = (pagination, sortFilter = "mostPopular") => {
    const { pageSize = 15, numPages = 1 } = pagination ?? {};

    return async (dispatch) => {
        const response = await fetch(
            `https://ugc-api.dovetailgames.com/mods?page=${numPages}&pageSize=${pageSize}&sortBy=${sortFilter}`
        );

        const resData = await response.json();
            console.log({resData})
        dispatch({ type: SET_MOD_LIST, mods: resData.data });
    };
};

export const fetchModDetails = (modId) => {
    return async (dispatch) => {
        const response = await fetch(
            `https://ugc-api.dovetailgames.com/mods/${modId}`
        );

        const resData = await response.json();

        dispatch({ type: SET_MOD_DETAILS, details: resData.data });
    };
};

export const toggleFavourite = (modId) => {
    return async (dispatch) => {
        dispatch({ type: SET_FAVOURITE, selectedFavourite: modId });
    };
};
