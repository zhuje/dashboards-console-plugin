import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';

export function IntervalRefreshDropDown () {
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
      15 seconds
    </DropdownItem>,
  ];

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle id="toggle-basic" onToggle={onToggle}>
          15 seconds
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={dropdownItems}
    />
  );
};