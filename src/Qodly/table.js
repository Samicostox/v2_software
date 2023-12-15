// CSVTable.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { CodeBlock, dracula } from 'react-code-blocks';

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
    let style = {
      maxWidth: '200px', // Default maxWidth
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    };

    if (header === 'Response_3.5' || header === 'Response_4_Vector') {
      style.maxWidth = '500px';
    } else if (header.toLowerCase().includes('time')) {
      style.maxWidth = '150px';
    }

    if (['Response_3.5', 'Response_4_Vector', 'Response_GPT4'].includes(header)) {
      switch (header) {
        case 'Response_3.5':
          style.backgroundColor = '#faf5ff';
          break;
        case 'Response_4_Vector':
          style.backgroundColor = '#fce7f3';
          break;
        case 'Response_GPT4':
          style.backgroundColor = '#ccfbf1';
          break;
        default:
          break;
      }
    }

    const value = parseFloat(cell);
    if (!isNaN(value)) {
      if (value > 10) style.color = '#ef4444';
      else if (value > 5) style.color = '#f59e0b';
      else style.color = '#10b981';
    }

    return style;
  };

  const renderCellContent = (cell, header) => {
    if (header === 'Response_GPT4') {
      // Splitting the content by lines and processing each line
      return cell.split('\n').map((line, index) => {
        // Check if a line contains the start or end of a code block
        if (line.startsWith('```') || line.endsWith('```')) {
          // Extract the code (excluding the backticks)
          const code = line.replace(/```/g, '').trim();
          // Render as a code block if it's not an empty string
          return code && <CodeBlock text={code} language="javascript" theme={dracula} key={index} />;
        } else {
          // Render as normal text
          return <span key={index}>{line}<br/></span>;
        }
      });
    }
    try {
      const parsedCell = JSON.parse(cell);
      if (parsedCell && typeof parsedCell === 'object' && parsedCell.response) {
        return <pre style={{ whiteSpace: 'pre-wrap' }}>{parsedCell.response}</pre>;
      }
    } catch (error) {
      // Not a JSON string, return as is
    }
    return cell;
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
                    {renderCellContent(cell, header)}
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
