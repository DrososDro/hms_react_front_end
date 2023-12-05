import toast from 'react-hot-toast'
import Table from '../../ui/Table'
import WorkDayRow from './WorkDayRow'
import CreateWorkDay from './CreateWorkDay'
import { useWorkDay } from './useWorkDay'

export default function WorkDayTable() {
  const { workDays, error } = useWorkDay()

  if (error) {
    toast.error(error?.message)
  }
  return (
    <Table columns='grid-cols-[1fr_1fr_1fr_1fr_1fr]'>
      <Table.Header>
        <div>Date</div>
        <div>Day</div>
        <div>Start of Work</div>
        <div>End of Work</div>
        <CreateWorkDay />
      </Table.Header>
      <Table.Body
        data={workDays}
        render={(workDay) => <WorkDayRow key={workDay.id} workday={workDay} />}
      />
    </Table>
  )
}
