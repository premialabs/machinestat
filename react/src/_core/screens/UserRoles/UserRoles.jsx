import React, { useState, useEffect, useRef } from "react"
import { Helmet } from "react-helmet-async";
import role_api from "../../api/role_api";
import user_profile_api from "../../api/user_profile_api";
import user_role_api from "../../api/user_role_api";
import { IconLoading, IconTickInCircle } from "../../utilities/svg-icons";

const UserRoles = () => {
  const [roles, setRoles] = useState();
  const [userProfiles, setUserProfiles] = useState();
  const [userRoles, setUserRoles] = useState();
  const [hoverPos, setHoverPos] = useState();
  const [cellState, setCellState] = useState([]);
  const [filterUserText, setFilterUserText] = useState()
  const [filterRoleText, setFilterRoleText] = useState()
  let originalDataRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        let role_res = await role_api.index();
        let user_prof_res = await user_profile_api.withUser();
        let user_role_res = await user_role_api.index();

        originalDataRef.current = {
          userProfiles: user_prof_res.data.data.sort((a, b) => {
            if (a.user.name < b.user.name) {
              return -1
            }
            if (a.user.name > b.user.name) {
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
          userRoles: user_role_res.data.data
        }

        setRoles(originalDataRef.current.roles);
        setUserProfiles(originalDataRef.current.userProfiles);
        setUserRoles(originalDataRef.current.userRoles);
      } catch (e) {

      }
    })();
  }, [])

  useEffect(() => {
    userRoles && setCellState(
      userRoles.reduce((acc, curr) => {
        return { ...acc, [`${curr.user_id}-${curr.role_id}`]: "ticked" }
      }, {})
    )
  }, [userRoles])

  const setCell = (r, c) => {
    setHoverPos({ row: r, col: c });
  }

  const handleCellClick = async (user_id, role_id) => {
    try {
      let prev_val = cellState[`${user_id}-${role_id}`];
      setCellState(prev => {
        return { ...prev, [`${user_id}-${role_id}`]: 'loading' }
      });
      let res = await user_role_api.toggle(user_id, role_id);
      let user_role_res = await user_role_api.index();
      originalDataRef.current = user_role_res.data.data;
      setUserRoles(originalDataRef.current);
    } catch (e) {

    }
  }

  const handleFilterRoleTextChange = (e) => {
    setFilterRoleText(e.target.value)
    setRoles(originalDataRef.current.roles.filter(role => (role.code.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0)))
  }

  const handleFilterUserTextChange = (e) => {
    setFilterUserText(e.target.value)
    setUserProfiles(originalDataRef.current.userProfiles.filter(userProfile => (userProfile.user.name.toUpperCase().indexOf(e.target.value.toUpperCase()) >= 0)))
  }

  return (
    <>
      <Helmet>
        <title>Roles per User</title>
      </Helmet>
      <div className="w-full p-2 rounded overflow-hidden">
        <h1>Roles per User Matrix</h1>
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
                      className="w-full h-8 rounded-md px-1 border focus:outline-none bg-yellow-50 text-center"
                      value={filterRoleText}
                      onChange={(e) => handleFilterRoleTextChange(e)}
                    />
                  </td>
                }
              </tr>
              <tr className="font-roboto text-sm">
                {
                  Array.isArray(userProfiles) &&
                  <td className="h-auto align-bottom">
                    <input
                      type="text"
                      className="w-full h-8 rounded-md px-1 border focus:outline-none bg-yellow-50 text-center"
                      value={filterUserText}
                      onChange={(e) => handleFilterUserTextChange(e)}
                    />
                  </td>
                }
                {
                  roles && roles.map((role, i) => {
                    return (
                      <td key={i} className={"w-12 align-bottom pb-1 border " + (hoverPos && hoverPos.col === i ? "bg-gray-200" : "")}>
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="100%">
                            <text id="thetext" transform="rotate(270, 12, 0) translate(-138,-2)" fill={(hoverPos && hoverPos.col === i ? "black" : "rgb(90,90,90)")}>{role.code}</text>
                            <text color="red">ddd</text>
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
                userProfiles && userProfiles.map((userProfile, r) => {
                  return (
                    <tr key={r} className="font-roboto text-sm h-8">
                      <td className={"border px-1 " + (hoverPos && hoverPos.row === r ? "bg-gray-200 text-black" : "text-gray-700")}>{userProfile.user.name}</td>
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
                                  handleCellClick(userProfile.user_id, role.id)
                                }
                              }}
                            >
                              {
                                (`${userProfile.user_id}-${role.id}` in cellState) &&
                                <Cell state={cellState[`${userProfile.user_id}-${role.id}`]} />
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

export default UserRoles;