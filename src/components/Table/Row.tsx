interface RowProps {
  data: any;
  titlesColumn: any[];
}

const Row: React.FC<RowProps> = ({ data, titlesColumn }) => {
  return (
    <tr>
      {titlesColumn.map((el) => {
        return <td key={el}>{data[el]}</td>;
      })}
    </tr>
  );
};

export default Row;
