import React, { PropTypes } from 'react';
import DashSelect from '../../common/DashSelect';

const getDatasetArray = datasetObject => {
  const datasetArray = [];
  const sortFunction = (a, b) => a.name.toLowerCase() > b.name.toLowerCase();

  Object.keys(datasetObject).forEach(key => {
    datasetArray.push(datasetObject[key]);
  });

  datasetArray.sort(sortFunction);

  return datasetArray;
};

const getDatasetOptions = (datasetArray) => {
  const output = [];

  datasetArray.forEach(option => {
    output.push({
      value: option.id, label: option.name,
    });
  });

  return output;
};

const getDashSelectOptionsFromColumnArray = (array) => {
  const output = [];

  if (array) {
    array.forEach((entry, index) => {
      output.push({
        value: index, label: entry.title,
      });
    });
  }

  return output;
};

export default function TwoAxisConfigMenu(props) {
  const datasetArray = getDatasetArray(props.datasets);
  const visualisation = props.visualisation;
  let xColumns = [];
  let yColumns = [];

  if (props.datasets[visualisation.sourceDatasetX]) {
    xColumns = props.datasets[visualisation.sourceDatasetX].columns || [];
  }

  if (props.datasets[visualisation.sourceDatasetY]) {
    yColumns = props.datasets[visualisation.sourceDatasetY].columns || [];
  }

  const datasetOptions = getDatasetOptions(datasetArray);
  const columnOptionsX = getDashSelectOptionsFromColumnArray(xColumns);
  const columnOptionsY = getDashSelectOptionsFromColumnArray(yColumns);


  return (
    <div className="TwoAxisConfigMenu">
      <div className="inputGroup">
        <label htmlFor="chartTitle">Chart title:</label>
        <input
          className="textInput"
          type="text"
          id="chartTitle"
          placeholder="Untitled chart"
          defaultValue={visualisation.name}
          onChange={props.onChangeTitle}
        />
      </div>
      <h3>X-Axis</h3>
      <div className="inputGroup">
        <label htmlFor="xDatasetMenu">Source dataset:</label>
        <DashSelect
          name="xDatasetMenu"
          value={visualisation.sourceDatasetX !== null ?
            visualisation.sourceDatasetX : 'Choose a dataset option...'}
          options={datasetOptions}
          onChange={props.onChangeSourceDatasetX}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="xColumnMenu">Dataset column:</label>
        <DashSelect
          name="xColumnMenu"
          value={visualisation.datasetColumnX !== null ?
            visualisation.datasetColumnX : 'Choose a dataset column...'}
          options={columnOptionsX}
          onChange={props.onChangeDatasetColumnX}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="xLabel">X Axis Label:</label>
        <input
          className="textInput"
          type="text"
          placeholder="X Axis label"
          defaultValue={visualisation.labelX}
          onChange={props.onChangeDatasetLabelX}
        />
      </div>

      <h3>Y-Axis</h3>
      <div className="inputGroup">
        <label htmlFor="yDatasetMenu">Source dataset:</label>
        <DashSelect
          name="yDatasetMenu"
          value={visualisation.sourceDatasetY !== null ?
            visualisation.sourceDatasetY : 'Choose a dataset option...'}
          options={datasetOptions}
          onChange={props.onChangeSourceDatasetY}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="yColumnMenu">Dataset column:</label>
        <DashSelect
          name="yColumnMenu"
          value={visualisation.datasetColumnY !== null ?
            visualisation.datasetColumnY : 'Choose a dataset column...'}
          options={columnOptionsY}
          onChange={props.onChangeDatasetColumnY}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="yLabel">Y Axis Label:</label>
        <input
          className="textInput"
          type="text"
          placeholder="Y Axis label"
          defaultValue={visualisation.labelY}
          onChange={props.onChangeDatasetLabelY}
        />
      </div>
    </div>
  );
}

TwoAxisConfigMenu.propTypes = {
  visualisation: PropTypes.object.isRequired,
  datasets: PropTypes.object.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeSourceDatasetX: PropTypes.func.isRequired,
  onChangeSourceDatasetY: PropTypes.func.isRequired,
  onChangeDatasetColumnX: PropTypes.func.isRequired,
  onChangeDatasetColumnY: PropTypes.func.isRequired,
  onChangeDatasetLabelX: PropTypes.func.isRequired,
  onChangeDatasetLabelY: PropTypes.func.isRequired,
};
