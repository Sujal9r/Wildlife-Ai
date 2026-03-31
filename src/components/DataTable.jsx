import { motion } from 'framer-motion';

export function DataTable({ columns, rows }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="table-shell scrollbar-thin overflow-x-auto"
    >
      <table className="min-w-full divide-y divide-white/10">
        <thead className="table-head">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-4 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-transparent">
          {rows.map((row, index) => (
            <tr key={row.id ?? index} className="transition hover:bg-white/[0.03]">
              {columns.map((column) => (
                <td key={column.key} className="table-cell align-top">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
