import api from "./init"

const system_parameter_api = {
  index: (query_params) => {
    return api().get("/api/fnd/systemParameters", { params: query_params })
  },
  get: (id) => {
    return api().get(`/api/fnd/systemParameters/${id}`)
  },
  create: (data) => {
    return api().post(`/api/fnd/systemParameters`, data)
  },
  update: (id, data) => {
    return api().patch(`/api/fnd/systemParameters/${id}`, data)
  },
}

export default system_parameter_api;