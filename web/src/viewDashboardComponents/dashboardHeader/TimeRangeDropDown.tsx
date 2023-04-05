import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';

export function TimeRangeDropDown () {
  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onFocus = () => {
    const element = document.getElementById('toggle-basic');
    element.focus();
  };

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  const dropdownItems = [
    <DropdownItem key="link" tooltip="Tooltip for enabled link">
      Last 30 seconds 
    </DropdownItem>,
  ];

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle id="toggle-basic" onToggle={onToggle}>
          Last 30 seconds
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={dropdownItems}
    />
  );
};