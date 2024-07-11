import React from 'react';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MRT_EditActionButtons } from 'material-react-table';

const AddEditRow = ({ title, internalEditComponents, table, row }) => {
  return (
    <>
      <DialogTitle variant="h5" color="primary">
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} dividers>
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
};

export default AddEditRow;
