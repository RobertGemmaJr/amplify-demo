import styled from "styled-components";

const MyHeader = styled.header`
    background-color: blue;
    margin: 0;
    * {
        margin-top: 0;
    }
`;

/**
 * 
 * @param {*} props 
 * @returns The applications header
 */
export default function Header(props) {
    return(
        <MyHeader>
            <h1>Apple Blossom Health Check</h1>
        </MyHeader>
    )
}