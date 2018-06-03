import Pot from '../components/Pot.js';
import { connect } from 'react-redux';
export const PotContainer = connect(state => ({pot: state.pot}))(Pot);