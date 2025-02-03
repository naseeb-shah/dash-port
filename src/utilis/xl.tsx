import React from 'react';
import * as XLSX from 'xlsx';

// Define the type for your data
type UserData = {
  share: any[]; // Replace `any` with a more specific type if needed
  _id: string;
  fullName: string;
  workEmail: string;
  organization: string;
  message: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
};



// Function to export data to Excel
 export const  exportToExcel = (data: UserData[], fileName: string) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to a file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

