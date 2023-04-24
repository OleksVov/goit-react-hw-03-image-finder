import React, {Component} from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');
export default class Modal extends Component {

componentDidMount() {
    window.addEventListener('keydown',this.handleKeyDown )
}
 componentWillUnmount() {
    window.removeEventListener('keydown',this.handleKeyDown )
 }

handleKeyDown = event => {
    if (event.code === 'Escape') {
        this.props.onCloseModal()
    }
}
 handleBackdropClick = event => {
    if(event.currentTarget === event.target) {
        this.props.onCloseModal()
    }
 }

    render() {
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
  <div className={css.modal}>
    {this.props.children}
  </div>
</div>,
modalRoot,
        )
    }
}

createPortal.propTypes = {
    children: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}