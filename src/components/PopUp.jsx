import React from 'react';
export const PopUp = ({ show, payload, hidePopUp }) => {
    if (show) setTimeout(() => hidePopUp(), 5000);
    return <div className={ show ? "pop-up show-pop-up" : "pop-up"}> {payload} </div>
};