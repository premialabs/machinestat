import api from "../../../_core/api/init";

const site_api = {
  get: (id) => {
    return api().get(`/api/sites/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/sites`, {
      params: {
        page_no: pageNo,
        page_size: pageSize,
        query: query
      }
    })
  },
  prepareEdit: (id) => {
    return api().get(`/api/sites/${id}/prepareEdit`)
  },
  update: (id, data) => {
    return api().patch(`/api/sites/${id}`, data)
  },
  prepareCreate: () => {
    return api().get(`/api/sites/prepareCreate`)
  },
  create: (data) => {
    return api().post(`/api/sites`, data)
  },
  delete: (id) => {
    return api().delete(`/api/sites/${id}`)
  },
}

export default site_api;