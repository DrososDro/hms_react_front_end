import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import PropTypes from 'prop-types'
import { deleteWorkDay } from '../../services/api/apiShifts'
import toast from 'react-hot-toast'

function DeleteWorkDay({ data, id }) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => deleteWorkDay(id),
    onSuccess: () => {
      toast.success('WorkDay deleted successfully')
      queryClient.invalidateQueries('workday')
    },
  })
  function handleConfirm() {
    mutate()
  }

  return (
    <Modal>
      <Modal.Open>Delete</Modal.Open>
      <Modal.Window>
        <ConfirmDelete resourceName={data} onConfirm={() => handleConfirm()} />
      </Modal.Window>
    </Modal>
  )
}
DeleteWorkDay.propTypes = {
  data: PropTypes.any,
  id: PropTypes.any,
}

export default DeleteWorkDay
