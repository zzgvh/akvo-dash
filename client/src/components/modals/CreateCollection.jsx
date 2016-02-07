import React, { Component, PropTypes } from 'react';
import SubmitModal from './SubmitModal';
import { createCollection } from '../../actions/collection';


require('../../styles/CreateCollectionModal.scss');

const modalStyle = {
  content: {
    width: 400,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default class CreateCollection extends Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleInputChange(evt) {
    this.setState({ name: evt.target.value.trim() });
  }

  handleSubmit() {
    this.setState({ name: '' });
    this.props.onSubmit(createCollection(this.state.name));
  }

  handleCancel() {
    this.setState({ name: '' });
    this.props.onCancel();
  }

  render() {
    return (
      <SubmitModal
        isOpen
        style={modalStyle}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        title="Create Collection"
        submitLabel="Create"
        isSubmitDisabled={this.state.name === ''}>
        <label htmlFor="nameInput">Collection name</label>
        <input
          id="nameInput"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Collection name"/>
      </SubmitModal>
    );
  }
}

CreateCollection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
