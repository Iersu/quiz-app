import styled from 'styled-components'

export const StyledSelect = styled('select')`
    width: 100%;
    background: transparent;
    border: 1px solid #999;
    font-size: 16px;
    padding: 17px 22px;
    color: white; 
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 20px;
    appearance: none;
    background-image: url("/assets/svgs/icon-dropdown.svg");
    background-repeat: no-repeat;
    background-position: right 22px top 50%;
    background-size: 20px;

    option {
        color: black;
    }
`