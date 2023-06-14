import { styled } from "styled-components";
import { Link } from "react-router-dom";

type SideBarProps = {};

const Div = styled.div`
  & {
    display: flex;
    flex-flow: column;
    border-right: 1px solid black;
  }
`;

const StyledLink = styled(Link)`
  & {
    font-family: arial;
    font-weight: bold;
    text-decoration: none;
    font-size: 20px;
    text-align: center;
    padding: 20px;
    transition: background-color 1s;
    color: inherit;
  }
  &:hover {
    background-color: #004369;
    color: white;
  }
`;

export function SideBar(_props: SideBarProps) {
  return (
    <Div>
      <StyledLink to="/home">Home</StyledLink>
      <StyledLink to="/category">Category</StyledLink>
      <StyledLink to="/product">Product</StyledLink>
      <StyledLink to="/transaction">Transaction</StyledLink>
      <StyledLink to="/profile">Profile</StyledLink>
    </Div>
  );
}
