import Modal from '../../ui/Modal'
import PropTypes from 'prop-types'
import useShifts from './useShifts'
import DetailsWorkDay from './DetailsWorkDay'

export default function WorkDayDetails({ name, workday }) {
  const { shifts } = useShifts()
  function getShift() {
    for (let i in shifts) {
      if (shifts[i].id === workday['shift']) {
        return shifts[i]
      }
    }
    return
  }
  const shift = getShift()

  return (
    <Modal>
      <Modal.Open>{name}</Modal.Open>
      <Modal.Window>
        <DetailsWorkDay shift={shift} data={workday} />
      </Modal.Window>
    </Modal>
  )
}

WorkDayDetails.propTypes = {
  name: PropTypes.string,
  workday: PropTypes.any,
}
