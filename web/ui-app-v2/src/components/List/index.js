import React from 'react';
import PropTypes from 'prop-types';
import { List as MaterialUiList, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SvgIcon from 'material-ui/SvgIcon';
// icons cont

const List = ({ listItemContainer, onItemHandler, listItemStyle = {}, listContainerStyle, items = [] }) => {
  const renderListItems = items => {
    return items.map((item, index) => {
      const listItemProps = {};

      const {
        primaryText,
        nestedItems,
        secondaryText,
        leftIcon,
        rightIcon,
        leftAvatar,
        rightAvatar,
        initiallyOpen,
        primaryTogglesNestedList,
        style,
      } = item;

      if (listItemStyle && Object.keys(listItemStyle).length) {
        listItemProps.style = listItemStyle;
      }
      if (primaryText) {
        listItemProps.primaryText = primaryText;
      }
      if (secondaryText) {
        listItemProps.secondaryText = secondaryText;
      }
      if (leftIcon) {
        listItemProps.leftIcon = leftIcon;
      }
      if (rightIcon) {
        listItemProps.rightIcon = rightIcon;
      }
      if (leftAvatar) {
        listItemProps.leftAvatar = leftAvatar;
      }
      if (rightAvatar) {
        listItemProps.rightAvatar = rightAvatar;
      }
      if (nestedItems) {
        listItemProps.nestedItems = renderListItems(nestedItems);
      }
      if (initiallyOpen) {
        listItemProps.initiallyOpen = true;
      }
      if (primaryTogglesNestedList) {
        listItemProps.primaryTogglesNestedList = primaryTogglesNestedList;
      }
      if (style && Object.keys(style).length) {
        listItemProps.style = style;
      }

      return <ListItem containerElement={listItemContainer} key={index} {...listItemProps} />;
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
      leftIcon: PropTypes.node,
      rightIcon: PropTypes.node,
      leftAvatar: PropTypes.instanceOf(Avatar),
      rightAvatar: PropTypes.instanceOf(Avatar),
      initiallyOpen: PropTypes.bool,
      primaryTogglesNestedList: PropTypes.bool,
      style: PropTypes.object,
    })
  ),
};

export default List;
