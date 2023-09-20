import styled from 'styled-components'
import { StyledBoxProps } from '../../constants/types'

export const StyledBox = styled('div')<StyledBoxProps>`
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  padding-top:${(props) => props.pt};
  padding-bottom:${(props) => props.pb};
  padding-left:${(props) => props.pl};
  padding-right:${(props) => props.pr};
  flex-direction:${(props) => props.flexDirection};

`