import React from "react";
interface OperationProps {
  id: number;
}
const Operation = ({ id }: OperationProps) => {
  return (
    <div className="flex">
      <div>edit1</div>
      <div>delt</div>
      <div>edit2</div>
    </div>
  );
};

export default Operation;
