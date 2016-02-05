import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubmitModal from './SubmitModal';
import Settings from '../dataset/Settings';
import { saveDatasetSettings } from '../../actions/dataset';

class DatasetSettings extends Component {
  constructor(props) {
    super(props);
    const { dataset } = this.props;
    this.state = { name: dataset.name };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(newName) {
    this.setState({ name: newName });
  }

  handleSubmit() {
    const { onSubmit, dataset } = this.props;
    onSubmit(saveDatasetSettings(dataset.id, this.state));
  }

  render() {
    const { onCancel, dataset } = this.props;
    return (
      <SubmitModal
        isOpen
        style={{ overlay: { zIndex: 1 } }}
        title="Dataset Settings"
        onSubmit={this.handleSubmit}
        onCancel={onCancel}>
          <Settings
            dataset={dataset}
            showPreview={false}
            onChangeName={this.handleChangeName}/>
      </SubmitModal>
    );
  }
}

DatasetSettings.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  dataset: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  const dataset = state.library.datasets[ownProps.id];
  return {
    dataset,
  };
}

export default connect(mapStateToProps)(DatasetSettings);
