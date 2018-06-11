import BetMenu from '../components/BetMenu.js';
import { makeBet } from '../actions/index.js';
import { connect } from 'react-redux';
export const BetMenuContainer = connect(
    state => ({currentlyActingPlayer: state.currentlyActingPlayer}), { makeBet }
)(BetMenu);