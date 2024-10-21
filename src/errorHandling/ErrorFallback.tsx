import React, { FC } from 'react';
//Error Fall back UI
const ErrorFallback: FC = () => {
  return (
    <div className="text-center">
      <h2>Oops.. Something went wrong..</h2>
      <h3>Please report this to application developer.</h3>
    </div>
  );
};
export default ErrorFallback;
