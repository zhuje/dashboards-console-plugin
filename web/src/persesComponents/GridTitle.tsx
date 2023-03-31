// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Box, IconButton, Stack, Typography } from '@mui/material';
import ExpandedIcon from 'mdi-material-ui/ChevronDown';
import CollapsedIcon from 'mdi-material-ui/ChevronRight';
import AddPanelIcon from 'mdi-material-ui/ChartBoxPlusOutline';
import PencilIcon from 'mdi-material-ui/PencilOutline';
import ArrowUpIcon from 'mdi-material-ui/ArrowUp';
import ArrowDownIcon from 'mdi-material-ui/ArrowDown';
import DeleteIcon from 'mdi-material-ui/DeleteOutline';
import { InfoTooltip } from '@perses-dev/components';
import { usePanelGroupActions, useEditMode, PanelGroupId, useDeletePanelGroupDialog } from '@perses-dev/dashboards';

export const TOOLTIP_TEXT = {
  // Toolbar buttons
  addPanel: 'Add panel',
  addGroup: 'Add panel group',
  downloadDashboard: 'Download JSON',
  editJson: 'Edit JSON',
  editVariables: 'Edit variables',
  refreshDashboard: 'Refresh dashboard',
  // Group buttons
  addPanelToGroup: 'Add panel to group',
  deleteGroup: 'Delete group',
  editGroup: 'Edit group',
  moveGroupDown: 'Move group down',
  moveGroupUp: 'Move group up',
  // Panel buttons
  editPanel: 'Edit',
  duplicatePanel: 'Duplicate',
  deletePanel: 'Delete',
  movePanel: 'Move',
  // Variable editor buttons
  refreshVariableValues: 'Refresh values',
  copyVariableValues: 'Copy values to clipboard',
};

export const ARIA_LABEL_TEXT = {
  // Group buttons
  addPanelToGroup: (groupName: string) => `add panel to group ${groupName}`,
  deleteGroup: (groupName: string) => `delete group ${groupName}`,
  editGroup: (groupName: string) => `edit group ${groupName}`,
  moveGroupDown: (groupName: string) => `move group ${groupName} down`,
  moveGroupUp: (groupName: string) => `move group ${groupName} up`,
  // Panel buttons
  editPanel: (panelName: string) => `edit panel ${panelName}`,
  duplicatePanel: (panelName: string) => `duplicate panel ${panelName}`,
  deletePanel: (panelName: string) => `delete panel ${panelName}`,
  movePanel: (panelName: string) => `move panel ${panelName}`,
};


export interface GridTitleProps {
  panelGroupId: PanelGroupId;
  title: string;
  collapse?: {
    isOpen: boolean;
    onToggleOpen: () => void;
  };
}

/**
 * Renders the title for a Grid section, optionally also supporting expanding
 * and collapsing
 */
export function GridTitle(props: GridTitleProps) {
  const { panelGroupId, title, collapse } = props;

  const { openAddPanel, openEditPanelGroup, moveUp, moveDown } = usePanelGroupActions(panelGroupId);
  const { openDeletePanelGroupDialog } = useDeletePanelGroupDialog();
  const { isEditMode } = useEditMode();

  const text = (
    <Typography variant="h2" sx={{ marginLeft: collapse !== undefined ? 1 : undefined }}>
      {title}
    </Typography>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        padding: (theme) => theme.spacing(1),
        backgroundColor: ({ palette }) =>
          palette.mode === 'dark' ? palette.background.paper : palette.background.default,
      }}
      data-testid="panel-group-header"
    >
      {collapse ? (
        <>
          <IconButton
            onClick={collapse.onToggleOpen}
            aria-label={`${collapse.isOpen ? 'collapse' : 'expand'} group ${title}`}
          >
            {collapse.isOpen ? <ExpandedIcon /> : <CollapsedIcon />}
          </IconButton>
          {text}
          {isEditMode && (
            <Stack direction="row" marginLeft="auto">
              <InfoTooltip description={TOOLTIP_TEXT.addPanelToGroup}>
                <IconButton aria-label={ARIA_LABEL_TEXT.addPanelToGroup(title)} onClick={openAddPanel}>
                  <AddPanelIcon />
                </IconButton>
              </InfoTooltip>
              <InfoTooltip description={TOOLTIP_TEXT.editGroup}>
                <IconButton aria-label={ARIA_LABEL_TEXT.editGroup(title)} onClick={openEditPanelGroup}>
                  <PencilIcon />
                </IconButton>
              </InfoTooltip>
              <InfoTooltip description={TOOLTIP_TEXT.deleteGroup}>
                <IconButton
                  aria-label={ARIA_LABEL_TEXT.deleteGroup(title)}
                  onClick={() => openDeletePanelGroupDialog(panelGroupId)}
                >
                  <DeleteIcon />
                </IconButton>
              </InfoTooltip>
              <InfoTooltip description={TOOLTIP_TEXT.moveGroupDown}>
                <IconButton
                  aria-label={ARIA_LABEL_TEXT.moveGroupDown(title)}
                  disabled={moveDown === undefined}
                  onClick={moveDown}
                >
                  <ArrowDownIcon />
                </IconButton>
              </InfoTooltip>
              <InfoTooltip description={TOOLTIP_TEXT.moveGroupUp}>
                <IconButton
                  aria-label={ARIA_LABEL_TEXT.moveGroupUp(title)}
                  disabled={moveUp === undefined}
                  onClick={moveUp}
                >
                  <ArrowUpIcon />
                </IconButton>
              </InfoTooltip>
            </Stack>
          )}
        </>
      ) : (
        // If we don't need expand/collapse, just render the title text
        text
      )}
    </Box>
  );
}
