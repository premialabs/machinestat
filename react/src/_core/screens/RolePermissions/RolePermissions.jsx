import React, { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async";
import role_api from "../../api/role_api";
import permission_api from "../../api/permission_api";
import role_permission_api from "../../api/role_permission_api";
import { IconLoading, IconTickInCircle } from "../../utilities/svg-icons";

const RolePermissions = () => {
  const [roles, setRoles] = useState();
  const [permissions, setPermissions] = useState();
  const [rolePermissions, setRolePermissions] = useState();
  const [hoverPos, setHoverPos] = useState();
  const [cellState, setCellState] = useState([]);
  const [filterPermissionText, setFilterPermissionText] = useState()
  const [filterRoleText, setFilterRoleText] = useState()
  let originalDataRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        let role_res = await role_api.index();
        let permission_res = await permission_api.index();
        let role_permission_res = await role_permission_api.list();

        originalDataRef.current = {
          permissions: permission_res.data.data.sort((a, b) => {
            if (a.endpoint < b.endpoint) {
              return -1
            }
            if (a.endpoint > b.endpoint) {
              return 1
            }
            return 0
          }),
          roles: role_res.data.data.sort((a, b) => {
            if (a.code < b.code) {
              return -1
            }
            if (a.code > b.code) {
              return 1
            }
            return 0
          }),
          rolePermissions: role_permission_res.data.data
        }

        setRoles(originalDataRef.current.roles);
        setPermissions(originalDataRef.current.permissions);
        setRolePermissions(originalDataRef.current.rolePermissions);
      } catch (e) {

      }
    })();
  }, [])

  useEffect(() => {
    rolePermissions && setCellState(
      rolePermissions.reduce((acc, curr) => {
        return { ...acc, [`${curr.permission_id}-${curr.role_id}`]: "ticked" }
      }, {})
    )
  }, [rolePermissions])

  const setCell = (r, c) => {
    setHoverPos({ row: r, col: c });
  }

  const handleCellClick = async (permission_id, role_id) => {
    try {
      let prev_val = cellState[`${permission_id}-${role_id}`];
      setCellState(prev => {
        return { ...prev, [`${permission_id}-${role_id}`]: 'loading' }
      });
      let res = await role_permission_api.toggle(permission_id, role_id);
      let role_permission_res = await role_permission_api.list();
      originalDataRef.current = role_permission_res.data.data;
      setRolePermissions(originalDataRef.current);
    } catch (e) {

    }
  }

  const handleFilterRoleTextChange = (e) => {
    setFilterRoleText(e.target.value)
    setRoles(originalDataRef.current.roles.filter(role => (role.code.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0)))
  }

  const handleFilterPermissionTextChange = (e) => {
    setFilterPermissionText(e.target.value)
    setPermissions(originalDataRef.current.permissions.filter(permission => (permission.endpoint.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0)))
  }

  return (
    <>
      <Helmet>
        <title>Permissions per Role</title>
      </Helmet>
      <div className="w-full p-2 rounded overflow-hidden">
        <h1 className="font-sans text-sm">Permissions per Role Matrix</h1>
        {
          !roles && <div>Loading...</div>
        }
        {
          roles &&
          <table>
            <thead>
              <tr className="font-roboto text-sm">
                <td></td>
                {
                  Array.isArray(roles) &&
                  <td className="" colSpan={roles.length}>
                    <input
                      type="text"
                      className="w-full h-8 rounded-md px-1 border focus:outline-none bg-yellow-50 text-center bg-indigo-600a"
                      value={filterRoleText}
                      onChange={(e) => handleFilterRoleTextChange(e)}
                    />
                  </td>
                }
              </tr>
              <tr className="font-roboto text-sm">
                {
                  Array.isArray(permissions) &&
                  <td className="h-auto align-bottom">
                    <input
                      type="text"
                      className="w-full h-8 rounded-md px-1 border focus:outline-none bg-yellow-50 text-center"
                          value={filterPermissionText}
                          onChange={(e) => handleFilterPermissionTextChange(e)}
                    />
                  </td>
                }
                {
                  roles && roles.map((role, i) => {
                    return (
                      <td key={i} className={"w-8 align-bottom pb-1 border " + (hoverPos && hoverPos.col === i ? "bg-gray-200" : "")}>
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="100%">
                            <text font-size="8pt" font-weight="bold" id="thetext" fill="rgb(90,90,90)" transform="rotate(270, 12, 0) translate(-138,-2)" >{role.code}</text>
                          </svg>
                        </div>
                      </td>
                    )
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                permissions && permissions.map((permission, r) => {
                  return (
                    <tr key={r} className="font-workSans font-semibold text-zinc-800 text-xs h-7">
                      <td className={"border px-1 " + (hoverPos && hoverPos.row === r ? "bg-gray-200" : "")}>
                        <span>{`${permission.endpoint}`}</span>
                        <span className="ml-2 text-sky-600 font-semibold">{`[${permission.method}]`}</span>
                      </td>
                      {
                        roles.map((role, c) => {
                          return (
                            <td
                              key={c}
                              className={"border hover:bg-gray-200 text-center bg-sky " + ((Object.values(cellState).filter(item => item === "loading").length > 0) ? "cursor-not-allowed" : "cursor-pointer")}
                              onMouseEnter={() => setCell(r, c)}
                              onMouseLeave={() => setHoverPos()}
                              onClick={() => {
                                if (Object.values(cellState).filter(item => item === "loading").length === 0) {
                                  handleCellClick(permission.id, role.id)
                                }
                              }}
                            >
                              {
                                (`${permission.id}-${role.id}` in cellState) &&
                                <Cell state={cellState[`${permission.id}-${role.id}`]} />
                              }
                            </td>
                          )
                        })
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        }
        {/* <pre>
          {
            JSON.stringify(cellState, null, 2)
          }
        </pre> */}
      </div>
    </>
  );
}

const Cell = ({ state }) => {
  return (
    <>
      {
        (state === "loading") && <IconLoading width="15" color="rgb(7, 89, 133)" className="animate-spin mx-auto" />
      }
      {
        (state === "ticked") && <IconTickInCircle width="15" color="rgb(2, 132, 199)" className="mx-auto" />
      }
    </>
  );
}

export default RolePermissions;