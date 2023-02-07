import api from "./init"

const user_role_api = {
  index: (query_params) => {
    return api().get("/api/fnd/userRoles", { params: query_params })
  },
  get: (id) => {
    return api().get(`/api/fnd/userRoles/${id}`)
  },
  create: (data) => {
    return api().post(`/api/fnd/userRoles`, data)
  },
  update: (id, data) => {
    return api().patch(`/api/fnd/userRoles/${id}`, data)
  },
  toggle: (user_id, role_id) => {
    return api().patch(`/api/fnd/userRoles/toggle`, { user_id: user_id, role_id: role_id })
  },
}

export default user_role_api;