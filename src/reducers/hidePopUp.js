export const hidePopUp = state => ({
    ...state,
    popUp: {
        ...state.popUp,
        show: false
    }
});
