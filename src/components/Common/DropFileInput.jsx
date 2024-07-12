import React, { useRef, useState, useEffect } from 'react';
import BackupIcon from '@mui/icons-material/Backup';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DropFileInput = ({ onFileChange, reset }) => {
  const wrapperRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileTypeValid, setFileTypeValid] = useState(null);

  useEffect(() => {
    if (reset) {
      setFile(null);
      setFileTypeValid(null);
    }
  }, [reset]);

  const onDragEnter = (e) => {
    e.preventDefault();
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('dragover');
    }
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove('dragover');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove('dragover');
    }
    if (!file) {
      const newFile = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      handleFile(newFile);
    }
  };

  const onFileDrop = (e) => {
    if (!file) {
      const newFile = e.target.files[0];
      handleFile(newFile);
    }
  };

  const handleFile = (newFile) => {
    if (newFile) {
      setFile(newFile);
      setFileTypeValid(
        newFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      onFileChange({ target: { files: [newFile] } });
    }
  };

  const handleClick = () => {
    if (!file) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      ref={wrapperRef}
      data-testid="drop-area"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      style={{
        minWidth: file ? 'auto' : 500,
        borderWidth: file ? 0 : 1,
        borderColor: file ? 'transparent' : '#399EE0',
        borderStyle: file ? 'none' : 'dashed',
        borderRadius: file ? 0 : '8px',
        marginTop: 20,
        marginBottom: 20,
        paddingBottom: file ? 0 : 10,
        paddingTop: file ? 0 : 10,
        backgroundColor: file ? 'transparent' : '#F2FAFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: file ? 'row' : 'column'
      }}>
      {file ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            maxWidth: '500px'
          }}>
          {fileTypeValid ? (
            <CheckCircleIcon data-testid="CheckCircleIcon" style={{ color: 'green' }} />
          ) : (
            <ErrorIcon data-testid="ErrorIcon" style={{ color: 'red' }} />
          )}

          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 'calc(100% - 100px)',
              fontWeight: 700,
              color: fileTypeValid ? 'grey' : 'black'
            }}>
            {file.name}
          </p>
          <p style={{ fontSize: '12px', fontWeight: 400, color: fileTypeValid ? 'grey' : 'black' }}>
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <BackupIcon
            style={{
              alignSelf: 'center',
              width: 35,
              height: 35,
              marginLeft: 15,
              marginRight: 15,
              color: '#003DA5',
              opacity: 1
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '84%',
              margin: 'auto'
            }}>
            <div style={{ width: '45%' }}>
              <span style={{ color: '#003DA5', fontWeight: 700, fontSize: '17px' }}>
                Drag & Drop file here or click upload
              </span>
              <br />
              <span style={{ fontWeight: 300, fontSize: '12px' }}>
                Accepted file types: Excel, Word
              </span>
            </div>
            <div
              style={{
                width: '40%',
                display: 'flex'
              }}>
              <button
                type="button"
                onClick={handleClick}
                style={{
                  width: '110px',
                  height: '35px',
                  borderRadius: '2rem',
                  margin: 'auto',
                  border: '1px solid #3b82f6',
                  color: '#003DA5',
                  fontWeight: 700
                }}>
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      <input
        data-testid="upload"
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileDrop}
        accept=".xlsx, .xls"
      />
    </div>
  );
};

export default DropFileInput;
