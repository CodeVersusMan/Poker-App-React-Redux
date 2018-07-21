import Card from '../components/Card';
import { connect } from 'react-redux';
export const CardContainer = connect(state => ({summary: state.summary}))(Card);