import BetMenu from '../components/BetMenu.js';
import { makeBet } from '../actions/index.js';
import { connect } from 'react-redux';

const BetMenuContainer = connect(null, { makeBet })(BetMenu);

export default BetMenuContainer;