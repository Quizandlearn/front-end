import React from "react";
import styled from "@emotion/styled/macro";
import FormError from "../FormError/FormError";
import * as mq from "../Modal/media-queries";

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
    fontSize: "20px",
    ...style,
    [mq.custom]: {
      fontSize: "16px",
    },
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
