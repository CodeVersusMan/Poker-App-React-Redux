import Button from '../components/Button.js';
import { connect } from 'react-redux';
import { nextTurn } from '../actions/index.js';

const ButtonContainer = connect(null, {nextTurn})(Button);

export default ButtonContainer;