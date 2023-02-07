import api from "./init"

const role_permission_api = {
  index: (query_params) => {
    return api().get("/api/fnd/rolePermissions", { params: query_params })
  },
  list: (query_params) => {
    return api().get("/api/fnd/rolePermissions/list", { params: query_params })
  },
  get: (id) => {
    return api().get(`/api/fnd/rolePermissions/${id}`)
  },
  create: (data) => {
    return api().post(`/api/fnd/rolePermissions`, data)
  },
  update: (id, data) => {
    return api().patch(`/api/fnd/rolePermissions/${id}`, data)
  },
  toggle: (permission_id, role_id) => {
    return api().patch(`/api/fnd/rolePermissions/toggle`, { permission_id: permission_id, role_id: role_id })
  },
}

export default role_permission_api;