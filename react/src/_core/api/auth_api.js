import api from "./init"

const auth_api = {
  csrf: () => {
    return api().get("/sanctum/csrf-cookie")
  },
  login: (username, password) => {
    return api().post("/login", { "username": username, "password": password })
  },
  logout: () => {
    return api().post("/logout")
  },
  user: () => {
    return api().get("/api/user")
  },
  userInquire: () => {
    return api().get("/api/userProfiles?inquireAuth")
  },
  register: (username, name, email, password) => {
    return api().post("/register", { "username": username, "name": name, "email": email, "password": password })
  },
}

export default auth_api;