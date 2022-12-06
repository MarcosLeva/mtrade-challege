import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

class Button extends React.Component {
  static defaultProps = {
    fontColor: "white",
    fontWeight: 100,
    borderRadius: "30px",
    padding: "0.75em 1.2em",
    borderSize: "0px solid",
    borderColor: "transparent",
    isUppercase: false,
    styleText: "",
    fontSize: "unset",
    margin: "unset",
    height: "unset",
    width: "unset",
    disabled: false,
  };

  render() {
    return (
      <ButtonDesign
        {...this.props}
        disabled={this.props.isLoading || this.props.disabled}
      >
        {this.props.isLoading ? (
          <Spinner
            animation="border"
            size="sm"
            role="status"
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          this.props.children
        )}
      </ButtonDesign>
    );
  }
}

export default Button;

const ButtonDesign = styled.button`
  align-content: center;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  background: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.fontColor || "#fff"};
  border: ${(props) => props.borderSize};
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  text-transform: ${(props) => (props.isUppercase ? "uppercase" : "none")};
  font-family: "RidleyGrotesk" !important;
  white-space: nowrap;
  ${(props) => (props.noPointer ? "cursor: unset !important" : "")};
  ${(props) => (props.styleText ? props.styleText : "")}
  transition: all 0.3s ease-out;
  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;
