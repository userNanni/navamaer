import React from "react";

const TableComponent = ({ data }: any) => {
  const headers = Object.keys(data[0]);
  const rows = data.map((item: any) => Object.values(item));

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: any[], index: React.Key | null | undefined) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
