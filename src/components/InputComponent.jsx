import React from "react";
const InputComponent = React.memo(({ name, value, onChange }) => (
  <>
    <h2 className="font-medium mb-1">{name}</h2>
    <input
      type="text"
      placeholder="Type here..."
      value={value}
      onChange={onChange}
      className="input input-secondary w-full mb-4"
    />
  </>
));
export default InputComponent;
