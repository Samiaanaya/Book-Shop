const TableHead = ({ text }: any) => {
  return (
    <th
      scope="col"
      className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
    >
      {text}
    </th>
  );
};

export default TableHead;
