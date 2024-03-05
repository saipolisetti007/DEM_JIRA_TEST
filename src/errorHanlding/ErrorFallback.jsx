import React from 'react';

function ErrorFallback(props) {
  const { error } = props;

  return (
    <>
      <div className="text-center">
        <h2>Oops.. Something went wrong..</h2>
        <h6>Please report this to application developer.</h6>
      </div>
      <h6>Message</h6>
      <div className="alert alert-danger p-1 mb-2" role="alert">
        {error.message.split('\n').map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
    </>
  );
}
export default ErrorFallback;
