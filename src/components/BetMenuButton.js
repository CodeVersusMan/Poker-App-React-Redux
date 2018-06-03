import React from 'react';
const BetMenuButton = ({task, handleClick}) => {
    return handleClick ? (
        <div 
            onClick={handleClick} 
            className="bet-menu_button"
            >
            {task}
        </div>
    ) : (
        <div className="bet-menu_button">
            {task}
        </div>
    )
};
export default BetMenuButton;