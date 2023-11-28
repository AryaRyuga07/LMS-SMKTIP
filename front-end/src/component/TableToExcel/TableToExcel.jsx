// import XLSX from "xlsx";

const TableToExcel = ({ filename }) => {
  const handleExportExcel = () => {
    // const ws = XLSX.utils.json_to_sheet(data, { header: headers });
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    // XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* {headers.map((header, index) => (
              <th scope="col" class="px-6 py-3" key={index}>
                {header}
              </th>
            ))} */}
          </tr>
        </thead>
        <tbody>
          {/* {data.map((item, index) => (
            <tr
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              key={index}
            >
              <td
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.Subject}
              </td>
              <td class="px-6 py-4">{item.Assignment}</td>
              <td class="px-6 py-4">{item.NISN}</td>
              <td class="px-6 py-4">{item.Name}</td>
              <td class="px-6 py-4">{item.Classroom}</td>
              <td class="px-6 py-4">{item.Grade}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      <button onClick={handleExportExcel}>Export to Excel</button>
    </div>
  );
};

export default TableToExcel;
