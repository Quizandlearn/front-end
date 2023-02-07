import styled from "@emotion/styled/macro";
import { Dialog as ReachDialog } from "@reach/dialog";
import * as colors from "../../Modal/colors";
import * as mq from "../../Modal/media-queries";

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

export { Input, FormGroup, CircleButton, Dialog };
