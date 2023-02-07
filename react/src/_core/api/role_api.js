import api from "./init"

const role_api = {
  index: (query_params) => {
    return api().get("/api/fnd/roles", { params: query_params })
  },
  get: (id) => {
    return api().get(`/api/fnd/roles/${id}`)
  },
  create: (data) => {
    return api().post(`/api/fnd/roles`, data)
  },
  update: (id, data) => {
    return api().patch(`/api/fnd/roles/${id}`, data)
  },
}

export default role_api;