import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

require('../../styles/SubmitModal.scss');

export default class SubmitModal extends Component {

  render() {
    const {
      isOpen,
      style,
      title,
      submitLabel,
      cancelLabel,
      onSubmit,
      isSubmitDisabled,
      onCancel,
      children,
    } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        style={style}>
        <div className="SubmitModal">
          <h2 className="title">{title}</h2>
          <button
            className="close clickable"
            onClick={onCancel}>
            X
          </button>
          <div className="contents">
            {children}
          </div>
          <div className="controls">
            <button
              className="cancel clickable"
              onClick={onCancel}>
              {cancelLabel}
            </button>
            <button
              className="create clickable"
              disabled={isSubmitDisabled}
              onClick={onSubmit}>
              {submitLabel}
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

SubmitModal.defaultProps = {
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  isSubmitDisabled: false,
}

SubmitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
