import styled from "styled-components";

// Keypad buttons with single letter
const Keypad = styled.button`
    width: 50px;
    height: 50px;
    margin: 5px 10px;

    text-align: center;
    font-size: 1.75em;

    border: none;
    border-radius: 5px;

    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.black};

    :hover {
        background-color: ${props => props.theme.secondary};
        color: ${props => props.theme.white};
    }
`;

// Menu buttons inside Header
const Menu = styled.button`
    width: 100px;
    height: 50px;
    margin: 0 15px;
    border: 3px solid ${props => props.theme.black};

    text-align: center;
    font-size: 1.5em;
    
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.black};

    :hover {
        background-color: ${props => props.theme.secondary};
        color: ${props => props.theme.white};
    }
`;

export default function Button(props) {
    const { type, text, click } = props
    
    // Determine type of button to render
    switch(type) {
        case "Menu":
            return <Menu onClick={click}>{text}</Menu>
        case "Keypad":
            return <Keypad onClick={click}>{text}</Keypad>;
        case "Name":
            return null // TEMP
        case "Question":
            return null // TEMP
        default:
            console.log("Invalid button type rendered: " + type)
            return null
    }
}