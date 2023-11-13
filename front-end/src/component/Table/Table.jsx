import { useMemo, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../Filter/FilterComponent";
import Button from "../Button/Button";

const Table = (props) => {
  // Filtering/Search
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = props.data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  // End Filtering/Search

  // Loader
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(props.data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  // End Loader

  return (
    <div className="w-[96vw] h-max">
      <DataTable
        title={props.title}
        columns={props.columns}
        data={filteredItems}
        progressPending={pending}
        defaultSortField="name"
        striped
        pagination
        subHeader
        subHeaderComponent={subHeaderComponent}
        onRowClicked={props.clickRow}
        keyField="id"
      />
      <div className={props.buttonClass}>
        <Button buttonName={"+ Add Data"} clicked={props.clicked} />
      </div>
    </div>
  );
};

export default Table;
