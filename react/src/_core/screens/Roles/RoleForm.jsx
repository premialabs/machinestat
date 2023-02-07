import React from "react";
import { TextField } from "../../components";

const RoleForm = ({ data, setData, disabled, apiError }) => {

  const onUserDataChanged = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <section className="mb-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 rounded p-1 ">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Code:</label>
          <TextField
            apiError={apiError}
            name="code"
            value={data ? data.code : ""}
            title="Code"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />          
        </div>
        <div className="col-span-2 p-1">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Description:</label>
          <TextField
            apiError={apiError}
            name="description"
            value={data ? data.description : ""}
            title="Description"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />
        </div>
      </div>
    </section>
  )
}

export default RoleForm;