import { BoxProps } from '../../constants/types'
import { StyledBox } from "./boxStyle"

 const Box = ({children, ...props}: BoxProps) => {
  return (
    <StyledBox {...props}>{children}</StyledBox>
  )
}

export default Box
