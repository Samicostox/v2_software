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
      maxWidth: "200px",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    };

    if (cell.length > 20) {
      style = {
        ...style,
        maxWidth: "600px",
      };
    }

    return style;
  };

  const renderCellContent = (cell) => {
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

    return cell;
  };

  const detectAndRenderCodeSnippet = (text) => {
    let inCodeBlock = false;
    let codeContent = "";

    // Split the text by lines and process each line
    const lines = text.split("\n");
    const processedLines = lines
      .map((line, index) => {
        if (line.startsWith("```") && !inCodeBlock) {
          inCodeBlock = true; // Enter code block mode
          return null; // Don't return any content for the starting backticks
        } else if (line.startsWith("```") && inCodeBlock) {
          inCodeBlock = false; // Exit code block mode

          // Here, render the code content collected so far in a CodeBlock component
          const codeBlockToRender = (
            <CodeBlock
              key={`codeblock-${index}`}
              text={codeContent}
              language="javascript"
              theme={dracula}
            />
          );

          // Reset codeContent for the next potential code block
          codeContent = "";
          return codeBlockToRender;
        }

        if (inCodeBlock) {
          // If in a code block, accumulate lines of code
          codeContent += `${line}\n`;
          return null; // Don't return any content while accumulating code block lines
        } else {
          // For lines outside of code blocks, return them as normal text
          return (
            <span key={index} className="text-black">
              {line}
              <br />
            </span>
          );
        }
      })
      .filter((component) => component !== null); // Filter out nulls (lines inside code blocks before rendering)

    // In case the text ends with a code block without exiting backticks
    if (inCodeBlock) {
      processedLines.push(
        <CodeBlock
          key="final-codeblock"
          text={codeContent}
          language="javascript"
          theme={dracula}
        />
      );
    }

    return <div>{processedLines}</div>;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: tableData.length > 0 ? "auto" : "100vh",
        justifyContent: tableData.length > 0 ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: tableData.length > 0 ? "20px" : "0",
        }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ margin: "auto", display: "block" }}
        />
      </div>
      {tableData.length > 0 && (
        <div className="overflow-x-auto" style={{ width: "100%" }}>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {Object.keys(tableData[0]).map((header, index) => (
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
                      {detectAndRenderCodeSnippet(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVTable;
