import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import EditIcon from '@mui/icons-material/Edit';
import ColumnsSettings from './ColumnsSettings';

type AddEditEventDialogPropsType = {
  open: boolean;
  rowData: Record<string, any> | null;
  isEdit: boolean;
  handleClose: any;
  customerId: string;
};

type TabPanelPropsType = {
  children?: React.ReactNode;
  value: number;
  index: number;
};

/**
 * TabPanel component to render the content of each tab.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to display inside the tab panel.
 * @param {number} props.value - The current tab index.
 * @param {number} props.index - The index of this tab panel.
 */

const TabPanel = (props: TabPanelPropsType) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

/**
 * AddEditEventDialog component to add or edit an event.
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Boolean to control the dialog visibility.
 * @param {Object} props.rowData - Data of the row to be edited.
 * @param {boolean} props.isEdit - Boolean to determine if the dialog is in edit mode.
 * @param {Function} props.handleClose - Function to handle closing the dialog.
 * @param {string} props.customerId - Customer ID for adding a new event.
 */

const AddEditEventDialog = ({
  open,
  rowData,
  isEdit,
  handleClose,
  customerId
}: AddEditEventDialogPropsType) => {
  const [value, setValue] = useState<number>(0);

  //Handle tab change
  const handleChange = (event: any, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={(event, reason) => {
        if (reason && reason === 'backdropClick') {
          return;
        }
        handleClose();
      }}
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}>
      <DialogTitle
        variant="h3"
        color="primary"
        sx={{ mb: 3, mt: 1 }}
        data-testid={isEdit ? 'editEvent' : 'newEvent'}>
        {isEdit ? 'Edit Event' : 'Add New Event'}
        <IconButton
          aria-label="close"
          size="small"
          color="primary"
          onClick={(event) => handleClose(event, 'escapeKeyDown')}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Add Event Tabs"
            sx={{ borderRight: 1, borderColor: 'divider', flexShrink: 0 }}>
            {isEdit ? (
              <Tab icon={<EditIcon />} iconPosition="start" label="Edit Record" />
            ) : (
              <Tab icon={<AddCircleIcon />} iconPosition="start" label="Add New Record" />
            )}
            <Tab
              icon={<SettingsIcon />}
              iconPosition="start"
              label="Settings"
              data-testid="settingsTab"
            />
          </Tabs>
          <Box sx={{ flexGrow: 1 }}>
            <TabPanel value={value} index={0}>
              <Typography
                component="h4"
                variant="h5"
                data-testid={isEdit ? 'editEvents' : 'newRecord'}>
                {isEdit ? 'Edit Event' : 'Add New Record'}
              </Typography>
              {isEdit ? (
                <EditEventForm rowData={rowData} handleClose={handleClose} />
              ) : (
                <AddEventForm handleClose={handleClose} customerId={customerId} />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Box className="mt-4">
                <Typography component="h4" variant="h5" data-testid="settings">
                  Settings
                </Typography>
                <Typography component="p" variant="subtitle1">
                  Manage your input fields in Event Promo Plan
                </Typography>
              </Box>
              <ColumnsSettings handleClose={handleClose} />
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditEventDialog;
