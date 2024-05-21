import React, { ReactNode } from "react";

const FormContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-first justify-center items-center h-screen bg-back">
      {children}
    </div>
  );
};

export default FormContainer;
