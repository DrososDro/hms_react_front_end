import Modal from '../../ui/Modal'
import WorkDaysForm from './WorkDayForm'

export default function CreateWorkDay() {
  return (
    // <>
    <Modal>
      <Modal.Open>Create WorkDay</Modal.Open>
      <Modal.Window>
        <WorkDaysForm />
      </Modal.Window>
    </Modal>
  )
}
