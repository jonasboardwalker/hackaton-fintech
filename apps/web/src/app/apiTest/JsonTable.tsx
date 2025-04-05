interface JsonTableProps {
  data: Record<string, unknown>[];
  title: string;
}

export function JsonTable({ data, title }: JsonTableProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {data && data.length > 0 && Object.keys(data[0] as Record<string, unknown>).map((key) => (
                <th key={key} className="px-4 py-2 border-b text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                {Object.values(item).map((value, valueIndex) => (
                  <td key={valueIndex} className="px-4 py-2 border-b">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 