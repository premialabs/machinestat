import api from "./init"

const user_permission_api = {
  index: () => {
    return api().get("/api/fnd/userPermissions")
  },
}

export default user_permission_api;