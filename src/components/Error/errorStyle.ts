import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const ErrorWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export const ErrorText = styled.h1``

export const ErrorLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  border-radius: 30px;
  padding: 5px 30px;
  border: 2px solid ${({ theme }) => theme.colors.borderColor};
`
