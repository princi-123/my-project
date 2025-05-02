import React from 'react'

function Alert (props) {
  const capitalize = (word)=>{
    if (word==="danger"){
      word = "error"
    }
    const lower = word.toLowercase();
    return lower.charAt(0).toUppercase() + lower.slice(1);
  }
  return (
    <div style={{height: '50px'}}>
      {props.Alert && <div className={'alert alert-${props.alert.type} alert dismissable fade show'} role="alert">
      <strong>{capitalize(props.Alert.type)}</strong>: {props.Alert.msg}
      </div>}
    </div>
  )
}

export default Alert;
