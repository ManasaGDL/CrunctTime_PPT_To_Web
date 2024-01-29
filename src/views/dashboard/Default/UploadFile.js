

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from "xlsx"
import { useContext , useEffect} from 'react';
import { Context,weekContext } from 'context/Context';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadFile() {
    const {data,setData} = useContext(Context)
    const { week ,setWeek} = useContext(weekContext)
    useEffect(()=>{
        if(data?.length>0)
   localStorage.setItem('data',JSON.stringify(data))
    },[data])
    const handleFileUpload =(e)=>{
    
       const reader = new FileReader()
       reader.readAsBinaryString(e.target.files[0])
       reader.onload = e=>{
        const data = e.target.result;
        const workbook = XLSX.read(data,{type:"binary"})
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet)
        setData(parsedData)
        setWeek('')
        localStorage.clear();
        
       }
    }
  return ( <>
    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" accept=".xlsx,.xls" onChange={handleFileUpload}/>
    </Button>



    
      </>
  );
}