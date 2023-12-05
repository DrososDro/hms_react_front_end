import Modal from '../../ui/Modal'
import ShiftForm from './ShiftForm'

export default function CreateShift() {
  return (
    // <>
    <Modal>
      <Modal.Open>Create Shift</Modal.Open>
      <Modal.Window>
        <ShiftForm />
      </Modal.Window>
    </Modal>
  )
}
