import { useCallback, useEffect, useMemo } from "react";
import cl from "classnames";
import Row from "./Row";
import Pagination from "../Pagination/Pagination";
import { dataObject } from "../../model/model";
import { useFetching } from "../../hooks/useFetching";
import { getData } from "../../api/getData";
import useSorted from "../../hooks/useSorted";
import useSearch from "../../hooks/useFilter";
import usePagination from "../../hooks/usePagination";
import styles from "./Table.module.css";
import { THeadMemo } from "./THead";

interface TableProp {
  searchValue: string;
}

const tHeadData: [string, string][] = [
  ["id", "ID"],
  ["title", "Заголовок"],
  ["body", "Описание"],
];

const Table: React.FC<TableProp> = ({ searchValue }) => {
  const [sortedData, switchSort, sortingInfo] = useSorted<dataObject[]>(
    [],
    "id",
    "asc"
  );
  const [filteredData] = useSearch(sortedData, searchValue, ["title", "body"]);
  const [viewArray, switchPage, paginationInfo] = usePagination(
    0,
    10,
    filteredData
  );

  const [fetchSearchBeer, isLoading, error] = useFetching(async () => {
    await getData().then((res) => {
      switchSort(res, "id", "asc");
    });
  });

  const handleSort: React.MouseEventHandler<HTMLTableCellElement> = useCallback(
    (e) => {
      const sortableProperty = e.currentTarget.getAttribute("data-name");
      if (sortableProperty) switchSort(sortedData, sortableProperty);
    },
    [sortedData]
  );

  useEffect(() => {
    fetchSearchBeer();
  }, []);

  useEffect(() => {
    switchPage.goTo(0);
  }, [searchValue]);

  if (error != "") {
    return <span>Ошибка: {error}</span>;
  }

  return (
    <>
      <TableUI
        tHeadData={tHeadData}
        data={viewArray}
        typeSorting={sortingInfo.type}
        sortedColumn={sortingInfo.property}
        handleSort={handleSort}
        isLoading={isLoading}
      />
      <Pagination
        countPages={paginationInfo.countPages}
        activePage={paginationInfo.activePage}
        handlePrevPage={switchPage.prev}
        handleNextPage={switchPage.next}
        switchPage={switchPage.goTo}
      />
    </>
  );
};

interface TableUIProp {
  tHeadData: [string, string][];
  data: dataObject[];
  typeSorting: string;
  sortedColumn: string;
  handleSort?: React.MouseEventHandler<HTMLTableCellElement>;
  isLoading: boolean;
}

const TableUI: React.FC<TableUIProp> = ({
  tHeadData,
  data,
  typeSorting,
  sortedColumn,
  handleSort,
  isLoading,
}) => {
  const titleColumns = useMemo(() => {
    return tHeadData.map((el) => el[0]);
  }, [tHeadData]);

  return (
    <>
      <table className={cl(styles.root)}>
        <THeadMemo
          tHeadData={tHeadData}
          typeSorting={typeSorting}
          sortedColumn={sortedColumn}
          handleSort={handleSort}
        />
        <tbody>
          {!isLoading &&
            data.map((dataRow) => {
              return (
                <Row
                  data={dataRow}
                  titlesColumn={titleColumns}
                  key={dataRow.id}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
