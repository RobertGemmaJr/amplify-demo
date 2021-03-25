import styled from "styled-components";

const Copyright = styled.p`
    text-align: center;
    font-size: 1.2em;

    * {
        margin-bottom: 0;
    }
`;

export default function Footer(props) {
  const year = new Date().getFullYear();

  return(
    <Copyright>Copyright {year} © DisruptWorks Technologies</Copyright>
  );
}