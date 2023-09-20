import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export const Title = styled.h1`
  font-family: Bungee;
  font-size: 120px;
  text-align: center;
`

export const Container = styled.div`
  min-height: 550px;
`

export const PlayerSelectButton = styled.div`
  width: 100%;
  border-radius: 20px;
  border: 1px solid ${({theme}) => theme.colors.borderColor};
  font-family: Arial;
  padding: 17px 22px;
  background: transparent;
  text-align: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
  margin-bottom: 25px;
  `

export const StyledSelect = styled('select')`
    width: 100%;
    background: transparent;  
    border: 1px solid #999;
    font-size: 16px;
    padding: 17px 22px;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 20px;
    appearance: none;
    background-image: url("/assets/images/icon-dropdown.svg");
    background-repeat: no-repeat;
    background-position: right 22px top 50%;
    background-size: 20px;
`