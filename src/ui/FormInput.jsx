import styled from 'styled-components'

const Input = styled.input`
  border-radius: var(--round-2xl);
  padding: 0 1rem;
  outline: none;
  border: 0.125rem solid var(--slate-200);
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
  }

  &:hover,
  &:focus {
    border: 0.125rem solid var(--sky-400);
  }
`
export default Input
