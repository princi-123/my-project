import React from 'react'

export const Alert = (props) => {
  return (
    <div style={{height:'50px'}}>
    {props.alert && <div className={`alert alert-success alert-dismissable fade show`} role="alert">
        <strong>{props.alert.type}</strong>:{props.alert.msg}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
    </div>}
    </div>
  );
}

export default Alert;
