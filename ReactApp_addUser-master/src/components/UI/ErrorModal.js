import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './ErrorModal.module.css';
import Card from './Card';
import Button from './Button';

const Backdrop = function (props) {
  return (
    <div className={classes.backdrop} onClick={props.closeErrorModal}></div>
  );
};

const ModalOverlay = function (props) {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
      </header>
      <footer className={classes.actions}>
        <Button onClick={props.closeErrorModal}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = function (props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeErrorModal={props.closeErrorModal} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          closeErrorModal={props.closeErrorModal}
        />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  );
};

export default ErrorModal;
