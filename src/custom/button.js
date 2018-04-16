import React from 'react';
import '../table.css';

const Button = (props) => {
    return (
        <div onClick={props.flipCard} className="button"></div>
    );
};

export default Button;