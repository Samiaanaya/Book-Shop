const TableData = ({ text }: any) => {
  return (
    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap">{text || "N/A"}</p>
    </td>
  );
};

export default TableData;
