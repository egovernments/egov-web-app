import React from "react";
import PropTypes from "prop-types";
import { List as MaterialUiList, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";

const List = ({ listItemContainer, onItemHandler, listItemStyle = {}, listContainerStyle, items = [] }) => {
  const renderListItems = (items) => {
    return items.map((item, index) => {
      const { nestedItems } = item;

      if (listItemStyle && Object.keys(listItemStyle).length) {
        item.style = listItemStyle;
      }
      if (nestedItems) {
        // recursive function for nested items
        item.nestedItems = renderListItems(nestedItems);
      }

      return <ListItem containerElement={listItemContainer} key={index} {...item} />;
    });
  };

  return (
    <div>
      <MaterialUiList style={listContainerStyle}>{renderListItems(items)}</MaterialUiList>
    </div>
  );
};

List.propTypes = {
  listItemContainer: PropTypes.string,
  listItemStyle: PropTypes.object,
  listContainerStyle: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      primaryText: PropTypes.string,
      nestedItems: PropTypes.array,
      secondaryText: PropTypes.string,
      leftIcon: PropTypes.element,
      rightIcon: PropTypes.element,
      leftAvatar: PropTypes.instanceOf(Avatar),
      rightAvatar: PropTypes.instanceOf(Avatar),
      initiallyOpen: PropTypes.bool,
      primaryTogglesNestedList: PropTypes.bool,
      style: PropTypes.object,
    })
  ),
};

export default List;
