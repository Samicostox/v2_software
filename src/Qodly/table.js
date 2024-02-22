import React, { useState } from "react";
import Papa from "papaparse";
import { CodeBlock, dracula } from "react-code-blocks";

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
      header: true,
    });
  };

  const getCellStyle = (cell) => {
    let style = {
      maxWidth: "200px", // Adjusted maxWidth
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    };

    // Adjust the style if the cell content is longer (e.g., for code content)
    if (cell.length > 20) {
      style = {
        ...style,
        maxWidth: "600px", // Increase maxWidth for longer content
      };
    }

    return style;
  };

  const renderCellContent = (cell) => {
    // Render content in a code editor if it's longer than 20 characters
    if (cell.length > 20) {
      var cleanedContent = cell.replace(/\\n/g, "\n").replace(/```/g, "");
      return (
        <CodeBlock
          text={cleanedContent}
          language="javascript"
          theme={dracula}
        />
      );
    }

    // Return cell content as is for shorter content
    return cell;
  };

  return (
    <div
      style={{
        height: "calc(100vh - 40px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="overflow-x-auto" style={{ flexGrow: 1 }}>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((header, index) => (
                  <th
                    scope="col"
                    className="py-3 px-6 border-r border-gray-300"
                    key={index}
                  >
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b`}
                key={index}
              >
                {Object.entries(row).map(([header, cell], idx) => (
                  <td
                    className="py-4 px-6 border-r border-gray-300"
                    style={getCellStyle(cell)}
                    key={idx}
                  >
                    {renderCellContent(cell)}
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
