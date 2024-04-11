import React from 'react';

export const useFileUpload = ({ isDataLoading, handleUploadDataExcel }) => {
  const [isLoading, setIsLoading] = React.useState(isDataLoading);
  const fileInputRef = React.useRef(null);

  const handleClick = () => {
    setIsLoading(true);
    fileInputRef.current.click();
    document.body.onfocus = checkCancel;
  };

  const handleFileUpload = async (event) => {
    await handleUploadDataExcel(event);
    setIsLoading(false);
    document.body.onfocus = null;
  };

  const checkCancel = () => {
    if (!fileInputRef.current.value.length) {
      setIsLoading(false);
    }
    document.body.onfocus = null;
  };

  return { isLoading, fileInputRef, handleClick, handleFileUpload, checkCancel };
};
