import React, { Component, PropTypes } from 'react';
import SourceSelection from './createDataset/SourceSelection';
import FileSelection from './createDataset/FileSelection';
import Settings from '../dataset/Settings';
import SubmitModal from './SubmitModal';
import { createDataset } from '../../actions/dataset';

require('../../styles/CreateDataset.scss');

export default class CreateDataset extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: 'source',
      dataset: {
        name: '',
        source: {
          type: 'DATA_FILE',
        },
        columns: null,
      },
    };
    this.handleNextOrImport = this.handleNextOrImport.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  pageComponent(page) {
    const { dataset } = this.state;
    switch (page) {
      case 'source':
        return (
          <SourceSelection
            dataSourceType={dataset.source.type}
            onChangeDataSourceType={newDataSourceType => (
              this.setState({
                dataset: { source: { type: newDataSourceType } },
              })
            )}
          />
      );
      case 'file':
        return (
          <FileSelection
            dataset={dataset}
            onChange={(newDataset) => {
              this.setState({ dataset: newDataset });
            }}
          />
      );
      case 'settings':
        return (
          <Settings
            showPreview
            dataset={dataset}
            onChangeName={(newName) => {
              this.setState({
                dataset: Object.assign({}, this.state.dataset, {
                  name: newName,
                }),
              });
            }}
          />
      );
      default: throw new Error(`Not yet implemented: ${page}`);
    }
  }

  handleNextOrImport() {
    const { onSubmit } = this.props;
    const { currentPage, dataset } = this.state;
    if (currentPage === 'source') {
      this.setState({ currentPage: 'file' });
    } else if (currentPage === 'file') {
      this.setState({ currentPage: 'settings' });
    } else if (currentPage === 'settings') {
      onSubmit(createDataset(dataset));
    }
  }

  isNextOrImportDisabled() {
    const { currentPage, dataset } = this.state;
    if (currentPage === 'source') {
      return false;
    } else if (currentPage === 'file') {
      return !dataset.columns;
    } else if (currentPage === 'settings') {
      return !dataset.name;
    }
  }

  handlePrevious() {
    const { currentPage } = this.state;
    if (currentPage === 'settings') {
      this.setState({ currentPage: 'file' });
    } else if (currentPage === 'file') {
      this.setState({ currentPage: 'source' });
    } else {
      this.props.onCancel();
    }
  }

  render() {
    const { currentPage } = this.state;
    return (
      <SubmitModal
        isOpen
        title="New Dataset"
        onSubmit={this.handleNextOrImport}
        onCancel={this.handlePrevious}
        isSubmitDisabled={this.isNextOrImportDisabled()}
        submitLabel={currentPage === 'settings' ? 'Import' : 'Next'}
        cancelLabel={currentPage === 'source' ? 'Cancel' : 'Previous'}>
        <div className="CreateDataset">
          <ul className="tabMenu">
            <li className={`tab ${currentPage === 'source' ? 'selected' : null}`}>Source</li>
            <li className={`tab ${currentPage === 'file' ? 'selected' : null}`}>File / Project</li>
            <li className={`tab ${currentPage === 'settings' ? 'selected' : null}`}>Settings</li>
          </ul>
          {this.pageComponent(currentPage)}
        </div>
      </SubmitModal>
    );
  }
}

CreateDataset.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
