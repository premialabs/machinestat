import api from "../../../_core/api/init";

const company_api = {
  get: (id) => {
    return api().get(`/api/companies/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/companies`, {
      params: {
        page_no: pageNo,
        page_size: pageSize,
        query: query
      }
    })
  },
  prepareEdit: (id) => {
    return api().get(`/api/companies/${id}/prepareEdit`)
  },
  update: (id, data) => {
    return api().patch(`/api/companies/${id}`, data)
  },
  prepareCreate: () => {
    return api().get(`/api/companies/prepareCreate`)
  },
  create: (data) => {
    return api().post(`/api/companies`, data)
  },
  delete: (id) => {
    return api().delete(`/api/companies/${id}`)
  },
}

export default company_api;