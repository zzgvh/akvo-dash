import React, { PropTypes } from 'react';
import LibraryListingItem from './LibraryListingItem';

const getListGroupTitle = (listGroupName, sortOrder) => {
  let title;

  if (sortOrder === 'name') {
    title = listGroupName.toUpperCase();
  } else if (sortOrder === 'created' || sortOrder === 'last_modified') {
    const date = new Date(Date.parse(listGroupName));
    const locale = 'en-us';
    const month = date.toLocaleString(locale, { month: 'long' });
    title = `${date.getDate()} ${month} ${date.getFullYear()}`;
  }

  return title;
};

const sortListGroupEntities = (entities, sortOrder, isReverseSort) => {
  const sortedEntities = [];
  let sortFunction;

  entities.map(entity => sortedEntities.push(entity));

  if (sortOrder === 'name') {
    sortFunction = (a, b) => {
      let output = a.name > b.name ? 1 : -1;
      if (isReverseSort) output = output * -1;
      return output;
    };
  } else if (sortOrder === 'created' || sortOrder === 'last_modified') {
    sortFunction = (a, b) => {
      const key = sortOrder === 'created' ? 'created' : 'modified';
      const dateA = new Date(a[key]) || new Date(a.created);
      const dateB = new Date(b[key]) || new Date(b.created);
      let output = dateA - dateB;

      if (isReverseSort) output = output * -1;

      return output;
    };
  }

  sortedEntities.sort(sortFunction);

  return sortedEntities;
};

export default function LibraryListingGroup({
  listGroup, displayMode, sortOrder, isReverseSort, onSelectEntity }) {
  const listGroupTitle = getListGroupTitle(listGroup.listGroupName, sortOrder);
  const sortedEntities = sortListGroupEntities(listGroup.entities, sortOrder, isReverseSort);

  return (
    <div className="LibraryListingGroup">
      <h3>{listGroupTitle}</h3>
      <ol>
        {sortedEntities.map((entity, index) =>
          <LibraryListingItem
            key={index}
            entity={entity}
            displayMode={displayMode}
            onSelectEntity={onSelectEntity}
          />
        )}
      </ol>
    </div>
  );
}

LibraryListingGroup.propTypes = {
  listGroup: PropTypes.shape({
    listGroupName: PropTypes.string.isRequired,
    entities: PropTypes.array,
  }),
  displayMode: PropTypes.oneOf(['list', 'grid']).isRequired,
  sortOrder: PropTypes.oneOf(['created', 'last_modified', 'name']).isRequired,
  isReverseSort: PropTypes.bool.isRequired,
  onSelectEntity: PropTypes.func.isRequired,
};
