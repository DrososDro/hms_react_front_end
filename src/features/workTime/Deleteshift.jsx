import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Modal from '../../ui/Modal'
import PropTypes from 'prop-types'
import { deleteShift } from '../../services/api/apiShifts'
import toast from 'react-hot-toast'

function Deleteshift({ data, id }) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => deleteShift(id),
    onSuccess: () => {
      toast.success('Shift deleted successfully')
      queryClient.invalidateQueries('shifts')
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
Deleteshift.propTypes = {
  data: PropTypes.any,
  id: PropTypes.any,
}

export default Deleteshift
