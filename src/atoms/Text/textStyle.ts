import styled from 'styled-components'
import { StyledTextProps } from '../../constants/types'

export const StyledText = styled('div')<StyledTextProps>`
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => props.fontWeight};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  padding-top:${(props) => props.pt};
  padding-bottom:${(props) => props.pb};
  padding-left:${(props) => props.pl};
  padding-right:${(props) => props.pr};
`