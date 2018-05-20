import React from 'react';

class Hidden extends React.Component {
   
render() {
    return (
        <div id = "here" className = "hidden-elements">
            <ul className = "the-list">
                {this.props.values.map((item, index) => {
                    return(
                        <li key={index} onClick={ev => this.props.sendInfo(index)}>{this.props.values[index]}</li>
                    );
                })}
            </ul>
        </div>
    );
}
}

export default Hidden;