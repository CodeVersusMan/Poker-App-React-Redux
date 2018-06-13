import BetMenu from '../components/BetMenu.js';
import { makeBet, foldCards, makeCall } from '../actions/index.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({currentlyActingPlayer: state.currentlyActingPlayer});

export const BetMenuContainer = connect(mapStateToProps, { makeBet, foldCards, makeCall })(BetMenu);