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

const TabPanel = (props) => {
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

const AddEditEventDialog = ({ open, rowData, isEdit, handleClose }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={handleClose}
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
          onClick={handleClose}
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
                <AddEventForm handleClose={handleClose} />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography component="h4" variant="h5" data-testid="settings">
                Settings
              </Typography>
            </TabPanel>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditEventDialog;
