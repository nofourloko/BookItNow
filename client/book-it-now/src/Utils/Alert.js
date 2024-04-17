import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({val, closeAlert, variant, msg}) {
  if (val) {
    return (
      <Alert variant={variant} onClose={() => closeAlert(false)} dismissible>
        <Alert.Heading style={{textAlign: 'center'}}>{msg.title}</Alert.Heading>
        <p style={{textAlign: 'center'}}>
         {msg.text}
        </p>
      </Alert>
    );
  }
}

export default AlertDismissibleExample;