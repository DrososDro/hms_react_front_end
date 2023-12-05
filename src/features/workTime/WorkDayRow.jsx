import { dayConvert, formatDate } from '../../helpers/helpers'
import Table from '../../ui/Table'
import PropTypes from 'prop-types'
import DeleteWorkDay from './DeleteWorkDay'
import WorkDayDetails from './WorkDayDetails'

export default function WorkDayRow({ workday }) {
  return (
    <Table.Row>
      <WorkDayDetails name={formatDate(workday.date)} workday={workday} />
      <div>{dayConvert(workday.day)}</div>
      <div>{workday.start_of_work}</div>
      <div>{workday.end_of_work}</div>
      <DeleteWorkDay data={formatDate(workday.date)} id={workday.id} />
    </Table.Row>
  )
}

WorkDayRow.propTypes = {
  workday: PropTypes.object,
}
