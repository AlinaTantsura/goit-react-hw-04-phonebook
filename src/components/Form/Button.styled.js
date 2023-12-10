import styled from 'styled-components';

const Button = styled.button(() => {
    return {
        padding: '3px 10px',
        width: 'fit-content',
        border: 'solid 1px #D3D3D3',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: '#C0C0C0',
            borderColor: '#A9A9A9',
        }
    }
})

export default Button;