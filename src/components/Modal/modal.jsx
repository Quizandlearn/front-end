/* eslint-disable */
/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";

import * as React from "react";
import { VisuallyHidden } from "@reach/visually-hidden";
import { Dialog, CircleButton } from "../UserProfile/ModalStyling/ModalStyling";
import * as colors from "../Modal/colors";

const ModalContext = React.createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick(...args) {
      setIsOpen(false);
      if (child.props.onClick) {
        child.props.onClick(...args);
      }
    },
  });
}

function ModalSaveButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick(...args) {
      setIsOpen(false);
      if (child.props.onClick) {
        child.props.onClick(...args);
      }
    },
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext);
  return React.cloneElement(child, {
    onClick(...args) {
      setIsOpen(true);
      if (child.props.onClick) {
        child.props.onClick(...args);
      }
    },
  });
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext);
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
  );
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <div css={{ display: "flex", justifyContent: "flex-end" }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3
        css={{
          textAlign: "left",
          fontSize: "1,5em",
          color: `${colors.blue}`,
          paddingBottom: "10px",
        }}
      >
        {title}
      </h3>
      {children}
    </ModalContentsBase>
  );
}

export {
  Modal,
  ModalDismissButton,
  ModalSaveButton,
  ModalOpenButton,
  ModalContents,
};
