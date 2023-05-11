import React from 'react'

export default function CustomInput(props) {

    let{ error,message,type, name,onChange} =props;
  return (
    <div>
           <input
              className="form-control mb-4"
              placeholder={message}
              type={type}
              name={name}
              onChange={onChange}
            />
            { error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
    </div>
  )
}
{/* <input
className="form-control mb-4"
placeholder={props.message}
type={props.type}
name={props.name}
onChange={props.onChange}
/>
{ props.errors.name && (
<div class="alert alert-danger" role="alert">
  {props.errors.name}
</div>
)} */}