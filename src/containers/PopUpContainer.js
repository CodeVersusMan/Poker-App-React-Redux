import { PopUp } from '../components/PopUp';
import { connect } from 'react-redux';
import { hidePopUp } from '../actions/index.js';

const mapStateToProps = state => ({
    show: state.popUp.show,
    payload: state.popUp.payload
});
export const PopUpContainer = connect(mapStateToProps, { hidePopUp })(PopUp);