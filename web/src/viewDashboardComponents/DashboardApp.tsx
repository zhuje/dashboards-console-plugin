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

import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { ErrorAlert, ErrorBoundary } from '@perses-dev/components';
import { DashboardResource } from '@perses-dev/core';
import {
  PanelDrawer,
  PanelGroupDialog,
  DeletePanelGroupDialog,
  DiscardChangesConfirmationDialog,
  DashboardToolbar,
  DeletePanelDialog,
} from '@perses-dev/dashboards';
import { useDashboard, useDiscardChangesConfirmationDialog, useEditMode } from '@perses-dev/dashboards';
import { Dashboard, DashboardProps} from "./Dashboard"

import { IntervalRefreshDropDown } from "./dashboardHeader/IntervalRefreshDropDown"
import { TimeRangeDropDown } from './dashboardHeader/TimeRangeDropDown';
import { DashboardsDropDown } from './dashboardHeader/DashboardsDropDown';
import { ClusterDropDown } from './dashboardHeader/ClusterDropDown';

export interface DashboardAppProps extends Pick<DashboardProps, 'emptyDashboard'> {
  dashboardResource: DashboardResource;
  dashboardTitleComponent?: JSX.Element;

  onSave?: (entity: DashboardResource) => Promise<DashboardResource>;
  onDiscard?: (entity: DashboardResource) => void;
  initialVariableIsSticky?: boolean;
  isReadonly: boolean;
}

export const DashboardApp = (props) => {
  const {
    dashboardResource,
    dashboardTitleComponent,
    emptyDashboard,
    onSave,
    onDiscard,
    initialVariableIsSticky,
    isReadonly,
  } = props;
  const { setEditMode } = useEditMode();
  const { dashboard, setDashboard } = useDashboard();
  const [originalDashboard, setOriginalDashboard] = useState<DashboardResource | undefined>(undefined);

  const { openDiscardChangesConfirmationDialog, closeDiscardChangesConfirmationDialog } =
    useDiscardChangesConfirmationDialog();

  const handleDiscardChanges = () => {
    // Reset to the original spec and exit edit mode
    if (originalDashboard) {
      setDashboard(originalDashboard);
    }
    setEditMode(false);
    closeDiscardChangesConfirmationDialog();
    if (onDiscard) {
      onDiscard(dashboard);
    }
  };

  const onEditButtonClick = () => {
    setEditMode(true);
    setOriginalDashboard(dashboard);
  };

  const onCancelButtonClick = () => {
    // check if dashboard has been modified
    if (JSON.stringify(dashboard) === JSON.stringify(originalDashboard)) {
      setEditMode(false);
    } else {
      openDiscardChangesConfirmationDialog({
        onDiscardChanges: () => {
          handleDiscardChanges();
        },
        onCancel: () => {
          closeDiscardChangesConfirmationDialog();
        },
      });
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* <DashboardToolbar
        dashboardName={dashboardResource.metadata.name}
        dashboardTitleComponent={dashboardTitleComponent}
        initialVariableIsSticky={initialVariableIsSticky}
        onSave={onSave}
        isReadonly={isReadonly}
        onEditButtonClick={onEditButtonClick}
        onCancelButtonClick={onCancelButtonClick}
      /> */}
       <div className="co-m-nav-title co-m-nav-title--detail">
          <div className="monitoring-dashboards__header">
                <h1 className="co-m-pane__heading">
                   Dashboards 
                </h1>
              <div className="monitoring-dashboards__options">
                  <div className="form-group monitoring-dashboards__dropdown-wrap">
                    <label htmlFor="monitoring-time-range-dropdown" className="monitoring-dashboards__dropdown-title">
                      Time Range
                    </label>
                    <TimeRangeDropDown />
                  </div>
                  <div className="form-group monitoring-dashboards__dropdown-wrap">
                    <label htmlFor="refresh-interval-dropdown" className="monitoring-dashboards__dropdown-title">
                      Refresh interval
                    </label>
                    <IntervalRefreshDropDown />
                  </div>
               </div>
            </div>
            
            <div className="monitoring-dashboards__variables">
              <div className="monitoring-dashboards__dropdowns">

                  <div className="form-group monitoring-dashboards__dropdown-wrap">
                    <label htmlFor="dashboards-dropdown" className="monitoring-dashboards__dropdown-title">
                          Dashboards
                    </label>
                    <DashboardsDropDown/>
                  </div>
                  <div className="form-group monitoring-dashboards__dropdown-wrap">
                    <label htmlFor="dashboards-variable-dropdown" className="monitoring-dashboards__dropdown-title">
                          Cluster
                    </label>
                    <ClusterDropDown/>
                  </div>

                </div>
                
            </div>
          </div>
     
      
        <div className="co-dashboard-body">
        <ErrorBoundary FallbackComponent={ErrorAlert}>
          <Dashboard emptyDashboard={emptyDashboard}/>
        </ErrorBoundary>
        <PanelDrawer />
        <PanelGroupDialog />
        <DeletePanelGroupDialog />
        <DeletePanelDialog />
        <DiscardChangesConfirmationDialog />
        </div>
    </Box>
  );
};
