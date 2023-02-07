import React, { useState, useRef, useEffect, useContext } from "react"
import { Helmet } from "react-helmet-async";
import user_profile_api from "../../api/user_profile_api";
import { Button, TextField } from "../../components";
import { ToastContext } from "../../providers/ToastContext";
import { IconChevronRight, IconDropDown, IconLoading } from "../../utilities/svg-icons"
import UserProfileForm from "./UserProfileForm";


const UserProfiles = () => {
  let Toast = useContext(ToastContext);
  const [selectedRow, setSelectedRow] = useState()
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isListFetching, setIsListFetching] = useState(false);
  const [isProfileFetching, setIsProfileFetching] = useState(false);
  const [apiErrorCreate, setApiErrorCreate] = useState("");
  const [apiErrorUpdate, setApiErrorUpdate] = useState("");

  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isNewUserMode, setIsNewUserMode] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [newUserData, setNewUserData] = useState();
  const pageSize = useRef(10);

  const getList = async () => {
    setIsListFetching(true);
    let user_res = await user_profile_api.list({ page_no: pageNo, page_size: pageSize.current });
    setUsers(user_res.data.data);
    setIsListFetching(false);
  }

  const getUserProfile = async (id) => {
    setIsProfileFetching(true);
    let user_res = await user_profile_api.get(id);
    setSelectedUser(user_res.data.data[0]);
    setIsProfileFetching(false);
  }

  const update = async () => {
    setIsUpdating(true);
    try {
      let res = await user_profile_api.update(selectedUser.id, selectedUser);
      setApiErrorUpdate("")
      Toast.show(
        <span className="font-nunito">User updated.</span>,
        Toast.Constants.Type.Success
      )
    } catch (e) {
      setApiErrorUpdate(JSON.parse(e.response.data.message))
    } finally {
      setIsUpdating(false);
    }
  }

  const create = async () => {
    setIsCreating(true);
    try {
      let res = await user_profile_api.create(newUserData);
      (async () => {
        getList();
      })();
      setApiErrorCreate("")
      setNewUserData();
      Toast.show(
        <span className="font-nunito">User created.</span>,
        Toast.Constants.Type.Success
      )
    } catch (e) {
      setApiErrorCreate(JSON.parse(e.response.data.message))
    } finally {
      setSelectedRow(0);
      setIsCreating(false);
    }
  }

  useEffect(() => {
    if ((typeof selectedRow !== 'undefined') && users) {
      getUserProfile(users[selectedRow].id);
    }
  }, [selectedRow, users])

  useEffect(() => {
    (async () => {
      getList();
    })();
    setSelectedRow(0);
  }, [])

  return (
    <>
      <Helmet>
        <title>User Profiles</title>
      </Helmet>
      <section className="p-2">
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2 rounded-t-lg border overflow-hidden">
              <div
                onClick={() => setIsNewUserMode(prev => !prev)}
                className={"cursor-pointer p-2 bg-sky-800 flex justify-between"}
              >
                <span className="text-white font-roboto text-xs">Create New User Profile</span>
                <IconDropDown width="12" color="white" className={" transition-all duration-300 " + (isNewUserMode ? "" : "-rotate-90")} />
              </div>
              <div className={"transition-height transform overflow-hidden " + (isNewUserMode ? " p-2 bg-gray-50 h-auto" : " h-0")}>
                <UserProfileForm data={newUserData} setData={setNewUserData} disabled={isCreating} apiErrorCreate={apiErrorCreate} />
                <section className="flex justify-end">
                  <Button
                    type="link"
                    text="Cancel"
                    disabled={isCreating}
                    callback={() => {
                      setNewUserData()
                      setIsNewUserMode(prev => !prev)
                    }}
                    animate={false}
                    className="h-7 px-3"
                  />
                  <Button
                    type="button"
                    text="Create"
                    disabled={isCreating}
                    callback={() => create()}
                    animate={isCreating}
                    variant="primary"
                    className="h-7 px-3"
                  />
                </section>
              </div>
            </div>
          </div>
          <div className="col-start-1">
            <div className="font-roboto rounded-t-lg overflow-hidden text-xs p-2 bg-sky-800 text-white text-center">Users List</div>
            <UserList data={users} selectedRow={selectedRow} setSelectedRow={setSelectedRow} isListItemFetching={isProfileFetching} />
          </div>
          <div className="rounded">
            <div className="font-roboto rounded-t-lg text-xs p-2 bg-sky-800 text-white text-center">Profile</div>
            {
              selectedUser &&
              <div className="grid grid-cols-3 gap-2 p-2 rounded bg-gray-50">
                <User
                  data={selectedUser}
                  setData={setSelectedUser}
                  isNewUserMode={isNewUserMode}
                  disabled={isProfileFetching}
                  apiError={apiErrorUpdate}
                />
                <section className="col-span-3 flex justify-end">
                  <Button
                    type="button"
                    text="Save"
                    disabled={isProfileFetching || isUpdating}
                    callback={() => update()}
                    animate={isUpdating}
                    variant="primary"
                    className="h-7 px-3"
                  />
                </section>
              </div>
            }
          </div>
        </div>
      </section>
    </>
  );
}

const UserList = ({ data, selectedRow, setSelectedRow, isListItemFetching }) => {
  if (data) {
    return (
      data.map(
        (item, rownum) => <UserListItem key={rownum} data={item} rownum={rownum} currentRow={selectedRow} setSelectedRow={setSelectedRow} isListItemFetching={isListItemFetching} />
      )
    )
  }
  return (<></>);

}

const UserListItem = ({ data, rownum, currentRow, setSelectedRow, isListItemFetching }) => {
  return (
    <div onClick={() => setSelectedRow(rownum)} className={"grid grid-cols-6 text-sm font-roboto hover:bg-yellow-100 text-gray-700 " + ((rownum === currentRow) ? "bg-gray-100" : "")}>
      <div className="p-1">{rownum + 1}</div>
      <div className="col-span-5 p-1 flex justify-between items-center">
        <span>{data.name}</span>
        {
          (rownum === currentRow) &&
          <>
            <span className={isListItemFetching ? "hidden" : ""}><IconChevronRight color="rgb(99, 102, 241)" width="15" /></span>
            <span className={isListItemFetching ? "" : "hidden"}><IconLoading className=" animate-spin mr-2 " width="15" color="rgb(7,89,133)" /></span>
          </>
        }
      </div>
    </div>
  )
}

const User = ({ data, setData, isNewUserMode, disabled, apiError }) => {
  const onUserChanged = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <>
      <label className="pr-2 font-roboto text-sm text-gray-600">Username:</label>
      <TextField
        name="username"
        value={data.user.username ? data.user.username : ""}
        title="Username"
        disabled={true}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onUserChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Name:</label>
      <TextField
        apiError={apiError}
        name="name"
        value={data.name ? data.name : ""}
        title="Name"
        disabled={disabled || (data.email === 'admin@domain.com')}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onUserChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Email:</label>
      <TextField
        apiError={apiError}
        name="email"
        value={("email" in data) ? data.email : (data.email ? data.email : "")}
        title="Email"
        disabled={disabled || (data.email === 'admin@domain.com')}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onUserChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Telephone No:</label>
      <TextField
        apiError={apiError}
        name="tel_no"
        value={data.tel_no ? data.tel_no : ""}
        title="Telephone No"
        disabled={disabled}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onUserChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Address:</label>
      <TextField
        apiError={apiError}
        name="address"
        value={data.address ? data.address : ""}
        title="Address"
        disabled={disabled}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onUserChanged}
        onBlurCallback={() => { }}
      />
    </>
  )
}

export default UserProfiles;