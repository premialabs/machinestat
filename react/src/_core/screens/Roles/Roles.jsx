import React, { useState, useRef, useEffect, useContext } from "react"
import { Helmet } from "react-helmet-async";
import role_api from "../../api/role_api";
import { Button, TextField } from "../../components";
import { ToastContext } from "../../providers/ToastContext";
import { IconChevronRight, IconDropDown, IconLoading } from "../../utilities/svg-icons"
import RoleForm from "./RoleForm";


const Roles = () => {
  let Toast = useContext(ToastContext);
  const [selectedRow, setSelectedRow] = useState()
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isListFetching, setIsListFetching] = useState(false);
  const [isProfileFetching, setIsProfileFetching] = useState(false);
  const [apiErrorCreate, setApiErrorCreate] = useState("");
  const [apiErrorUpdate, setApiErrorUpdate] = useState("");

  const [roles, setRoles] = useState();
  const [selectedRole, setSelectedRole] = useState();
  const [isNewRoleMode, setIsNewRoleMode] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [newRoleData, setNewRoleData] = useState();
  const pageSize = useRef(10);

  const getList = async () => {
    setIsListFetching(true);
    let role_res = await role_api.index({ page_no: pageNo, page_size: pageSize.current });
    setRoles(role_res.data.data);
    setIsListFetching(false);
  }

  const getRole = async (id) => {
    setIsProfileFetching(true);
    let role_res = await role_api.get(id);
    setSelectedRole(role_res.data.data[0]);
    setIsProfileFetching(false);
  }

  const update = async () => {
    setIsUpdating(true);
    try {
      let res = await role_api.update(selectedRole.id, selectedRole);
      setApiErrorUpdate("")
      Toast.show(
        <span className="font-nunito">Role updated.</span>,
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
      let res = await role_api.create(newRoleData);
      (async () => {
        getList();
      })();
      setApiErrorCreate("")
      setNewRoleData();
      Toast.show(
        <span className="font-nunito">Role created.</span>,
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
    if ((typeof selectedRow !== 'undefined') && roles) {
      getRole(roles[selectedRow].id);
    }
  }, [selectedRow, roles])

  useEffect(() => {
    (async () => {
      getList();
    })();
    setSelectedRow(0);
  }, [])

  return (
    <>
      <Helmet>
        <title>Roles</title>
      </Helmet>
      <section className="p-2">
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="col-span-2">
            <div className="mb-2 rounded-t-lg border overflow-hidden">
              <div
                onClick={() => setIsNewRoleMode(prev => !prev)}
                className={"cursor-pointer p-2 bg-sky-800 flex justify-between"}
              >
                <span className="text-white font-roboto text-xs">Create New Role</span>
                <IconDropDown width="12" color="white" className={" transition-all duration-300 " + (isNewRoleMode ? "" : "-rotate-90")} />
              </div>
              <div className={"transition-height transform overflow-hidden " + (isNewRoleMode ? " p-2 bg-gray-50 h-auto" : " h-0")}>
                <RoleForm data={newRoleData} setData={setNewRoleData} disabled={isCreating} apiErrorCreate={apiErrorCreate} />
                <section className="flex justify-end">
                  <Button
                    type="link"
                    text="Cancel"
                    disabled={isCreating}
                    callback={() => {
                      setNewRoleData()
                      setIsNewRoleMode(prev => !prev)
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
            <div className="font-roboto rounded-t-lg overflow-hidden text-xs p-2 bg-sky-800 text-white text-center">Roles List</div>
            <RoleList data={roles} selectedRow={selectedRow} setSelectedRow={setSelectedRow} isListItemFetching={isProfileFetching} />
          </div>
          <div className="rounded">
            <div className="font-roboto rounded-t-lg text-xs p-2 bg-sky-800 text-white text-center">Profile</div>
            {
              selectedRole &&
              <div className="grid grid-cols-3 gap-2 p-2 rounded bg-gray-50">
                <Role
                  data={selectedRole}
                  setData={setSelectedRole}
                  isNewRoleMode={isNewRoleMode}
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

const RoleList = ({ data, selectedRow, setSelectedRow, isListItemFetching }) => {
  if (data) {
    return (
      data.map(
        (item, rownum) => <RoleListItem key={rownum} data={item} rownum={rownum} currentRow={selectedRow} setSelectedRow={setSelectedRow} isListItemFetching={isListItemFetching} />
      )
    )
  }
  return (<></>);

}

const RoleListItem = ({ data, rownum, currentRow, setSelectedRow, isListItemFetching }) => {
  return (
    <div onClick={() => setSelectedRow(rownum)} className={"grid grid-cols-6 text-sm font-roboto hover:bg-yellow-100 text-gray-700 " + ((rownum === currentRow) ? "bg-gray-100" : "")}>
      <div className="p-1">{rownum + 1}</div>
      <div className="col-span-5 p-1 flex justify-between items-center">
        <span>{data.description}</span>
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

const Role = ({ data, setData, isNewRoleMode, disabled, apiError }) => {
  const onRoleChanged = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  return (
    <>
      <label className="pr-2 font-roboto text-sm text-gray-600">ID:</label>
      <TextField
        name="id"
        value={data.id ? data.id : ""}
        title="ID"
        disabled={true}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onRoleChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Code:</label>
      <TextField
        apiError={apiError}
        name="code"
        value={data.code ? data.code : ""}
        title="Code"
        disabled={disabled}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onRoleChanged}
        onBlurCallback={() => { }}
      />
      <label className="pr-2 font-roboto text-sm text-gray-700">Description:</label>
      <TextField
        apiError={apiError}
        name="description"
        value={data.description ? data.description : ""}
        title="Description"
        disabled={disabled}
        className="text-gray-800 text-sm col-span-2"
        textAlign="left"
        onChangeCallback={onRoleChanged}
        onBlurCallback={() => { }}
      />
    </>
  )
}

export default Roles;