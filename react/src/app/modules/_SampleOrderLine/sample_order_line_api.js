import api from "../../../_core/api/init"

const sample_order_line_api = {
  index: (page_no, page_size) => {
    return api().get(`/api/sampleOrderLines/`, { params: { page_no: page_no, page_size: page_size } })
  },
  getPOLines: (po_id, page_no, page_size) => {
    return api().get(`/api/sampleOrderLines/`, { params: { po_id: po_id, page_no: page_no, page_size: page_size } })
  },
  get: (id) => {
    return api().get(`/api/sampleOrders/${id}`)
  },
  query: (page_no, page_size, query) => {
    return api().get(`/api/sampleOrderLines/query`, { params: { page_no: page_no, page_size: page_size, query: query } })
  },
  prepareEdit: (id) => {
    return api().get(`/api/sampleOrderLines/prepareEdit`, { params: { id: id } })
  },
  update: (id, data) => {
    return api().patch(`/api/sampleOrderLines/${id}`, data)
  },
  prepareDuplicate: (id) => {
    return api().get(`/api/sampleOrderLines/prepareDuplicate`, { params: { id: id } })
  },
  prepareCreate: (parent_id, curr_seq, positioning) => {
    return api().get(`/api/sampleOrderLines/prepareCreate`, { params: { parent_id: parent_id, curr_seq: curr_seq, positioning: positioning } })
  },
  create: (data) => {
    return api().post(`/api/sampleOrderLines`, data)
  },
  delete: (id) => {
    return api().delete(`/api/sampleOrderLines/${id}`)
  },
}

export default sample_order_line_api;