interface Props {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({
  headers,
  children,
}: Props) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b bg-gray-50">
          {headers.map((header) => (
            <th
              key={header}
              className="px-4 py-3 text-left"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}