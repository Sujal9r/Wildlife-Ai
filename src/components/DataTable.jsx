import { motion } from 'framer-motion';

export function DataTable({ columns, rows }) {
  const primaryColumn = columns[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="table-shell"
    >
      {rows.length ? (
        <>
          <div className="divide-y divide-white/10 md:hidden">
            {rows.map((row, index) => (
              <article key={row.id ?? index} className="table-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
                      {primaryColumn?.label}
                    </p>
                    <div className="mt-2 text-base font-semibold text-white">
                      {primaryColumn?.render ? primaryColumn.render(row[primaryColumn.key], row) : row[primaryColumn?.key]}
                    </div>
                  </div>
                  {row.id ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      {row.id}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {columns.slice(1).map((column) => (
                    <div key={column.key} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">{column.label}</p>
                      <div className="mt-2 text-sm leading-6 text-white/80">
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="scrollbar-thin hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="table-head">
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} className="px-5 py-4 font-medium">
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
          </div>
        </>
      ) : (
        <div className="flex min-h-48 items-center justify-center px-6 py-10 text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/35">No matches</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">Try a different keyword in the search bar to find matching records.</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
