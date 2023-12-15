// CSVTable.js
import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVTable = () => {
  const [tableData, setTableData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    parseCSV(file);
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setTableData(result.data);
      },
      header: true
    });
  };

  const getCellStyle = (header, cell) => {
    let style = {};

    // Apply background color for specific columns
    if (['Response_3.5', 'Response_4_Vector', 'Response_GPT4'].includes(header)) {
      switch (header) {
        case 'Response_3.5':
          style.backgroundColor = '#faf5ff'; // Light purple
          break;
        case 'Response_4_Vector':
          style.backgroundColor = '#fce7f3'; // Light pink
          break;
        case 'Response_GPT4':
          style.backgroundColor = '#ccfbf1'; // Slightly darker purple
          break;
        default:
          break;
      }
    }

    // Apply text color for numeric values
    const value = parseFloat(cell);
    if (!isNaN(value)) {
      if (value > 10) style.color = '#ef4444'; // Red for values above 10
      else if (value > 5) style.color = '#f59e0b'; // Orange for values between 5 and 10
      else style.color = '#10b981'; // Green for values under 5
    }

    return style;
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="overflow-x-auto relative mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((header, index) => (
                  <th scope="col" className="py-3 px-6 border-r border-gray-300" key={index}>
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`} key={index}>
                {Object.entries(row).map(([header, cell], idx) => (
                  <td className="py-4 px-6 border-r border-gray-300" style={getCellStyle(header, cell)} key={idx}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CSVTable;



const getCellBackground = (header) => {
    switch (header) {
      case 'Response_3.5':
        return 'bg-purple-100'; // Light purple
      case 'Response_4_Vector':
        return 'bg-pink-100'; // Light pink
      case 'Response_GPT4':
        return 'bg-teal-100'; // Slightly darker purple
      default:
        return '';
    }
  };
