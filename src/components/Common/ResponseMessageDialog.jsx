import React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

const ResponseMessageDialog = ({ responseMessage, isOpen, onClose }) => {
  const handleClose = () => {
    onClose(false);
  };
  return (
    <Dialog fullWidth={true} maxWidth="xl" open={isOpen} onClose={handleClose}>
      <DialogTitle>Please correct the errors and upload</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div className="min-h-80">
          {responseMessage && (
            <>
              <Alert severity="error">{responseMessage.message}</Alert>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead className="bg-slate-500">
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" className="text-white">
                          Row
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" className=" text-white">
                          Form Filed
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" className="text-white">
                          Error Message
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {responseMessage.errors.map((error, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                          <Typography variant="subtitle2"> {error.row}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography> {error.field}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography> {error.error}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseMessageDialog;
