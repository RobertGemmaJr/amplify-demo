import styled from "styled-components"

/** 
 * @todo Make height stretch such that footer is at bottom of page 
 *      Should be able to do this by stretching bottom padding
*/
const MyContent = styled.div`
    padding: 2%;
    margin: auto;
`;

export default function Content(props) {
    return <MyContent>{props.children}</MyContent>
}