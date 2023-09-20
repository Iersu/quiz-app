import { StyledSelect } from './dropdownStyle'

const Select = ({children, ...props}: any) => {
  return (
    <StyledSelect {...props}>{children}</StyledSelect>
  )
}

export default Select