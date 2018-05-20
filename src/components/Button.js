import React from 'react';
const Button = ({nextTurn}) => {
    return <div onClick={nextTurn} className="button"></div>
}
export default Button;