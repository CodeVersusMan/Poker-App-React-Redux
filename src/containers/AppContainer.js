import App from '../components/App.js';
import * as actions from '../actions/index.js';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state})

const AppContainer = connect(mapStateToProps, actions)(App);

export default AppContainer;