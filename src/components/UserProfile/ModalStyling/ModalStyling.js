import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/react";
import { Dialog as ReachDialog } from "@reach/dialog";
import { FaSpinner } from "react-icons/fa";
import * as colors from "../../Modal/colors";
import * as mq from "../../Modal/media-queries";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

Spinner.defaultProps = {
  "aria-label": "loading",
};

const buttonVariants = {
  primary: { background: colors.indigo, color: colors.base },
  secondary: { background: colors.gray, color: colors.text },
};

const Button = styled.button(
  {
    marginTop: "20px",
    padding: "10px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
    width: "100%",
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

const Input = styled.input({
  border: `1px solid ${colors.gray20}`,
  padding: "10px",
  background: "#f1f2f7",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
  color: "#434449",
  border: `1px solid ${colors.gray10}`,
  cursor: "pointer",
});

const Dialog = styled(ReachDialog)({
  display: "block",
  maxWidth: "450px",
  borderRadius: "10px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "70%",
    margin: "10vh auto",
  },
});

export { Button, Input, FormGroup, CircleButton, Dialog, Spinner };
