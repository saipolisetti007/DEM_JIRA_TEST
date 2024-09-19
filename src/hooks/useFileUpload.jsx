import React from 'react';

// Custom hook for handling file uploads
export const useFileUpload = ({ isDataLoading, handleUploadDataExcel }) => {
  const [isLoading, setIsLoading] = React.useState(isDataLoading);
  // Reference to the file input element
  const fileInputRef = React.useRef(null);

  // Function to handle the click event on the file input
  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input element
    document.body.onfocus = checkCancel; // Set up a focus event listener to check for cancel
  };

  // Function to handle the file upload event
  const handleFileUpload = async (event) => {
    setIsLoading(true);
    await handleUploadDataExcel(event);
    setIsLoading(false);
    document.body.onfocus = null; // Remove the focus event listener
  };

  // Function to check if the file upload was canceled
  const checkCancel = () => {
    if (!fileInputRef.current.value.length) {
      setIsLoading(false);
    }
    document.body.onfocus = null;
  };

  // Return the state and handlers for use in components
  return { isLoading, fileInputRef, handleClick, handleFileUpload, checkCancel };
};
