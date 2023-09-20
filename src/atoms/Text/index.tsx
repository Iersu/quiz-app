import { TextProps } from '../../constants/types'
import { StyledText } from "./textStyle"

const Text = ({children, ...props}: TextProps) => {
  return (
    <StyledText {...props}>{children}</StyledText>
  )
}

export default Text