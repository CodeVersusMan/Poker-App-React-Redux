import React from 'react';

class Opener extends React.Component {
    
    state = {toggle: false};

switcher = () => {
    const here = document.getElementById('here');
    if (!this.state.toggle) {
        here.style.display = 'block';
        this.setState({toggle: true});
    } else {
        here.style.display = 'none';
        this.setState({toggle: false});
    }
}

render() {
    return (
        <div onClick={this.switcher} className = "menu-opener"><i className = "fas fa-angle-down"></i>
        </div>
    );
}
}

export default Opener;