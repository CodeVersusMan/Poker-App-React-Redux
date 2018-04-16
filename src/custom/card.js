import React from 'react';
import '../table.css';

const Card = (props) => {
    
    return <div id={props.propId} className={props.styleProp !== '' ? props.interpret(props.classProp) + ' ' + props.styleProp : props.interpret(props.classProp)}><span className="value-style">{props.creatorResult}</span></div>
    
};

export default Card;