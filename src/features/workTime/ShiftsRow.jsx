import PropTypes from 'prop-types'
import Table from '../../ui/Table'
import Deleteshift from './Deleteshift'
export default function ShiftsRow({ shift }) {
  return (
    <Table.Row>
      <div>{shift.start_of_shift}</div>
      <div>{shift.end_of_shift}</div>
      <Deleteshift
        id={shift.id}
        data={`${shift.start_of_shift}-${shift.end_of_shift}`}
      />
    </Table.Row>
  )
}

ShiftsRow.propTypes = {
  shift: PropTypes.object,
}
