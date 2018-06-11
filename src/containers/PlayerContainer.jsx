import Player from '../components/Player';
import { connect } from 'react-redux';
export const PlayerContainer = connect(state => ({currentlyActingPlayer: state.currentlyActingPlayer}))(Player);