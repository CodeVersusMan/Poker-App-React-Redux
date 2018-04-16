import React from 'react';
import Hidden from './hidden.js';
import PropTypes from 'prop-types';

class Output extends React.Component {
    
        state = { 
            placeholder: "Select an option",
        };

    sendInfo = (index) => {
        const vessel = this.props.values[index];
        const newText = "The selected option is: "
        this.setState({placeholder: newText + vessel});
    };

render() {
    const defaultText = this.state.placeholder;
    return (
        <div className="text-output">
            <p>{defaultText}</p>
            <Hidden values={this.props.values} sendInfo={this.sendInfo}/>
        </div>
    );
}
}

Output.propTypes = {
    values: PropTypes.array
};

export default Output;