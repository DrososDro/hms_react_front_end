import Spinner from '../../ui/Spinner'
import Table from '../../ui/Table'
import ShiftsRow from './ShiftsRow'
import CreateShift from './CreateShift'
import useShifts from './useShifts'

export default function ShiftsTable() {
  const { shifts, isLoading } = useShifts()
  if (isLoading) {
    return <Spinner />
  }
  return (
    <Table columns='grid-cols-[1fr_1fr_1fr]'>
      <Table.Header>
        <div>start of shift</div>
        <div>end of shift</div>
        <CreateShift />
      </Table.Header>
      <Table.Body
        data={shifts}
        render={(shift) => <ShiftsRow key={shift.id} shift={shift} />}
      />
    </Table>
  )
}
