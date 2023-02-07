import React from "react";
import { PasswordField, TextField } from "../../components";

const UserProfileForm = ({ data, setData, disabled, apiError }) => {

  const onUserDataChanged = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <section className="mb-4">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1 rounded p-1 ">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Username:</label>
          <TextField
            apiError={apiError}
            name="username"
            value={data ? data.username : ""}
            title="Username"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />
        </div>
        <div className="col-span-1 rounded p-1 ">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Name:</label>
          <TextField
            apiError={apiError}
            name="name"
            value={data ? data.name : ""}
            title="Name"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />          
        </div>
        <div className="col-span-1 p-1">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Email:</label>
          <TextField
            apiError={apiError}
            name="email"
            value={data ? data.email : ""}
            title="Email"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />
        </div>
        <div className="col-span-1 p-1">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Password:</label>
          <PasswordField
            apiError={apiError}
            name="password"
            value={data ? data.password : ""}
            title="Password"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
            required
          />
        </div>
        <div className="col-start-1 col-span-1 p-1">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Telephone No:</label>
          <TextField
            apiError={apiError}
            name="tel_no"
            value={data ? data.tel_no : ""}
            title="Telephone No"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
        <div className="col-span-2 p-1">
          <label className="block font-roboto text-xs text-gray-500 font-semibold mb-1">Address:</label>
          <TextField
            apiError={apiError}
            name="address"
            value={data ? data.address : ""}
            title="Address"
            disabled={disabled}
            className="text-gray-800 text-sm w-full"
            textAlign="left"
            onChangeCallback={onUserDataChanged}
            onBlurCallback={null}
          />
        </div>
      </div>
    </section>
  )
}

export default UserProfileForm;