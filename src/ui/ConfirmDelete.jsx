import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledConfirmDelete = styled.div`
  width: auto;
  background-color: var(--slate-200);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`

function ConfirmDelete({ resourceName, onConfirm, onCloseModal }) {
  function handleConfirm() {
    onConfirm()
    onCloseModal()
  }
  return (
    <StyledConfirmDelete>
      <h3 className='rounded-md bg-red-500 px-5 text-2xl text-slate-200'>
        Delete {resourceName}
      </h3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <button
          className='rounded-md px-5 py-1 hover:bg-sky-400/20'
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className='rounded-md bg-red-500 px-5 py-1 text-lg text-slate-100 hover:bg-red-600'
          onClick={handleConfirm}
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  )
}

export default ConfirmDelete

ConfirmDelete.propTypes = {
  resourceName: PropTypes.string,
  onConfirm: PropTypes.func,
  onCloseModal: PropTypes.func,
}
