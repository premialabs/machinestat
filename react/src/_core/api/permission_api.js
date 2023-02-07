import api from "./init"

const permission_api = {
  index: () => {
    return api().get("/api/fnd/permissions")
  },
}

export default permission_api;