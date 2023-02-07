import styled from "@emotion/styled";
import React from "react";
import FormError from "../FormError/FormError";

/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */

const ReusableButton = ({
  children,
  submitError,
  width,
  padding,
  style,
  ...props
}) => {
  const StyledButton = styled.button({
    backgroundColor: "#2B6FD2",
    color: "white",
    fontFamily: "Roboto",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "0 30px",
    marginTop: "10px",
    ...style,
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1.5em",
        width: "100%",
      }}
    >
      {submitError && <FormError errorContent={submitError} />}
      <StyledButton {...props}>{children}</StyledButton>
    </div>
  );
};

export default ReusableButton;
