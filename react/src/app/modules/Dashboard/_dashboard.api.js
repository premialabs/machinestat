import api from "../../../_core/api/init";

const equipment_api = {
  get: (id) => {
    return api().get(`/api/equipment/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/equipment`, {
      params: {
        page_no: pageNo,
        page_size: pageSize,
        query: query
      }
    })
  },
  prepareEdit: (id) => {
    return api().get(`/api/equipment/${id}/prepareEdit`)
  },
  update: (id, data) => {
    return api().patch(`/api/equipment/${id}`, data)
  },
  prepareCreate: () => {
    return api().get(`/api/equipment/prepareCreate`)
  },
  create: (data) => {
    return api().post(`/api/equipment`, data)
  },
  delete: (id) => {
    return api().delete(`/api/equipment/${id}`)
  },
}

export default equipment_api;