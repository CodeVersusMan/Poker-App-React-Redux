import Pot from '../components/Pot.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({pot: state.pot})

const PotContainer = connect(mapStateToProps)(Pot);

export default PotContainer;