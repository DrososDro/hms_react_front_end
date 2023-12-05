import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
const TableContext = createContext()

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      {children}
    </TableContext.Provider>
  )
}
function Body({ data, render }) {
  if (!data.length) return <div>empty</div>
  return <div className=' h-full overflow-y-scroll'> {data.map(render)}</div>
}
function Header({ children }) {
  const { columns } = useContext(TableContext)
  return (
    <div
      role='row'
      className={`grid bg-slate-200 py-2 text-center mt-4 font-bold ${columns}`}
    >
      {children}
    </div>
  )
}
function Row({ children }) {
  const { columns } = useContext(TableContext)
  return (
    <div
      className={`mt-1 grid ${columns} text-center odd:bg-slate-100 even:bg-slate-200`}
    >
      {children}
    </div>
  )
}

Table.Body = Body
Table.Header = Header
Table.Row = Row

Header.propTypes = {
  children: PropTypes.any,
}
Table.propTypes = {
  columns: PropTypes.any,
  children: PropTypes.any,
}
Body.propTypes = {
  data: PropTypes.any,
  render: PropTypes.any,
}
Row.propTypes = {
  children: PropTypes.any,
}

export default Table
