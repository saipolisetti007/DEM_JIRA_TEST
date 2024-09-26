import { IconButton, InputAdornment } from '@mui/material';
import { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

// Define columns for the comments table
const CommentsColumns = ({ comments, setComments }) => {
  const [editMode, setEditMode] = useState({});
  const columns = useMemo(
    () => [
      {
        accessorKey: 'comment',
        header: 'Your Comment',
        muiEditTextFieldProps: ({ row }) => ({
          type: 'text',
          size: 'small',
          variant: 'outlined',
          className: `comment-input ${editMode[row.id] ? 'focused' : ''}`,
          id: `comment-${row.id}`,
          InputProps: {
            endAdornment: editMode[row.id] ? (
              <InputAdornment position="end">
                <IconButton
                  data-testid="clear-button"
                  onClick={() => {
                    setEditMode({ ...editMode, [row.id]: false });
                  }}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ) : null
          },
          onFocus: () => {
            setEditMode({ ...editMode, [row.id]: true });
          },
          onBlur: () => {
            setEditMode({ ...editMode, [row.id]: false });
          },
          //store edited user in state to be saved later
          onChange: (event) => {
            const newComments = { ...comments, [row.id]: event.target.value };
            setComments(newComments);
          }
        })
      }
    ],
    [comments, setComments, editMode]
  );

  return columns;
};

export default CommentsColumns;
