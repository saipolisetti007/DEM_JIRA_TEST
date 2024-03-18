import React, { useState, useEffect } from 'react';
import TableComponent from '../Common/TableComponent';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button
} from '@material-tailwind/react';
//import * as XLSX from 'xlsx';
import AddEditRecord from '../Common/AddEditRecord';
import BlankExcelDownload from '../Common/BlankExcelDownload';
import ExcelWithDataDownload from '../Common/ExcelWithDataDownload';
import UploadExcelData from '../Common/UploadExcelData';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../api/api';
import { setStoreData } from './storeDcSlice';
import { deleteRowData, updateRowData } from '../../api/storeApi';

const StoreToDcTable = () => {
  const [isPopupOpen, setIsPopUpOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [tableHeadings, setTableHeadings] = useState([]);

  const tableData = useSelector((state) => state.storeData.storeData || []);

  const dispatch = useDispatch();

  // const [val, setVal] = useState('');

  useEffect(() => {
    fetchTableData();
  }, [dispatch]);

  const fetchTableData = async () => {
    const responseData = await getData();
    dispatch(setStoreData(responseData));
    setTableHeadings(Object.keys(responseData[0]));
  };

  const handleEdit = async (rowData) => {
    setRowData(rowData);
    setIsPopUpOpen(true);
    await dispatch(updateRowData(rowData.id, rowData));
    fetchTableData();
  };

  const handleDelete = async (id) => {
    await dispatch(deleteRowData(id));
    fetchTableData();
  };

  const handleOpenPopup = () => {
    setRowData(null);
    setIsPopUpOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopUpOpen(false);
  };

  // const handleFileUpload = (uploadedFile) => {
  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     const bstr = evt.target.result;
  //     const workbook = XLSX.read(bstr, { type: 'binary' });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];
  //     const newData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //     setTableHeadings(newData.shift());
  //     const combinedData = [...tableData, ...newData];
  //     setTableData(combinedData);
  //   };
  //   reader.readAsBinaryString(uploadedFile);
  //   console.log(uploadedFile);
  // };

  return (
    <div className="container mx-auto">
      <Card className="h-full w-full shadow-2xl border-t-4 border-cyan-700">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" as="h2" color="blue-gray">
                Store to DC Mapping
              </Typography>
              <Typography color="gray" variant="small" className="mt-1 font-normal">
                See information about Stores
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outlined" size="sm">
                Filters
              </Button>
              <Button onClick={handleOpenPopup} size="md" color="cyan">
                Add New Record
              </Button>
            </div>
          </div>
          <hr />
          <div className="flex justify-end py-2 gap-2">
            <BlankExcelDownload tableHeadings={tableHeadings} />
            <UploadExcelData
              // onFileUpload={handleFileUpload}
              title="Upload New Data Add to Record"
              color="light-blue"
            />
            <ExcelWithDataDownload tableHeadings={tableHeadings} tableData={tableData} />
            <UploadExcelData
              // onFileUpload={handleFileUpload}
              title="Re-Upload / Overwrite Data"
              color="light-green"
            />
          </div>
        </CardHeader>
        <CardBody className="p-0 overflow-x-auto px-0">
          <TableComponent
            tableHeadings={tableHeadings}
            tableData={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
      {/* 
      <select label="Subsector" name="subsector" value={val} onChange={(val) => setVal(val)}>
        <option value="text1">Text1</option>
        <option value="text2">Text2</option>
        <option value="text3">Text3</option>
      </select>

      <p>{val}</p> */}

      {isPopupOpen && (
        <AddEditRecord
          onClose={handleClosePopup}
          onOpen={handleOpenPopup}
          isPopupOpen={isPopupOpen}
          rowData={rowData}
        />
      )}
    </div>
  );
};

export default StoreToDcTable;
