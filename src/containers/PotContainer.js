import Pot from '../components/Pot.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    pot: state.pot,
    betAmountThisRound: state.betAmountThisRound
});

export const PotContainer = connect(mapStateToProps)(Pot);