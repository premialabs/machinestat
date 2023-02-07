import { useContext, useEffect, useRef, useState } from "react"
import { IconKey, IconLoading } from "../../utilities/svg-icons"
import { AuthContext } from "../../providers/AuthContext";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const usernameRef = useRef()
  const auth = useContext(AuthContext);
  const [data, setData] = useState({ email: "", password: "" })
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const { isPingingServer, isAuthWaiting, authError } = auth;
  const [err, setErr] = useState()

  const login = async () => {
    await auth.login(data.username, data.password);
  }

  useEffect(() => {
    if (["Network Error", "Unauthenticated."].includes(authError)) {
      setErr(authError)
    } else {
      setErr(authError.username)
    }
  }, [authError])

  useEffect(() => {
    setFieldsDisabled(isPingingServer || isAuthWaiting || (authError === "Network Error"))
    setLoginDisabled(isPingingServer || isAuthWaiting || !data || (data.username === "") || (data.password === ""))
  }, [isPingingServer, isAuthWaiting, authError, data])

  useEffect(() => {
    usernameRef.current.focus();
  },[fieldsDisabled])

  return (
    <>
      <Helmet>
        <title>Mach Stat Sign-in</title>
      </Helmet>
      <div className="mx-auto h-screen w-[350px]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-center pb-3 font-montserrat font-semibold text-lg text-gray-400"><span className="text-orange-600">Mach</span>ine <span className="text-orange-600">Stat</span>istics</h1>
          <form className="">
            <h2 className="text-lg font-medium mb-4">Sign In</h2>
            <div className="mb-4">
              <label className="block font-semibold text-[13px] font-nunito mb-1" htmlFor="username">
                Username
              </label>
              <input
                ref={usernameRef}
                className="w-full font-inter text-gray-600 border border-gray-400 h-8 rounded shadow-inner px-2 focus:outline-1 outline-orange-400"
                value={data?.username || ''}
                onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))}
                type="text"
                disabled={fieldsDisabled}
                autoFocus
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-[13px] font-nunito mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full font-inter text-gray-600 border border-gray-400 h-8 rounded shadow-inner px-2 focus:outline-1 outline-orange-400"
                type="password"
                id="password"
                name="password"
                required
                value={data?.password || ''}
                onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                onKeyDown={e => (e.key === "Enter" ? login() : "")}
                disabled={fieldsDisabled}
              />
            </div>
            <div className={"text-xs font-nunito rounded text-red-600 font-semibold " + (authError && (authError !== "Unauthenticated.") ? "" : "hidden")}>
              <span>{err}</span>
            </div>
            <div className="flex justify-end items-center mt-6">
              <span className={((isPingingServer) ? "text-xs font-nunito rounded text-orange-400 pr-3" : "hidden")}>
                <span>Connecting to server...</span>
              </span>
              <span className={((isAuthWaiting) ? "pr-3" : "hidden")}>
                <IconLoading className="animate-spin " width="18" color="rgb(249, 115, 22)" />
              </span>
              <button
                className={`leading-none text-xs font-nunito bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold h-8 px-4 rounded border border-orange-700 hover:border-orange-600 `}
                disabled={loginDisabled}
                onClick={() => login()}
              >
                Continue
              </button>
            </div>
          </form>
          <hr className="mt-5" />
          <div className="flex justify-center -mt-2 mb-5">
            <span className="font-nunito bg-white px-3 text-xs text-gray-400 leading-none">New to Mach Stat?</span>
          </div>
          <button
            className={`w-full leading-none text-xs font-nunito bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-600 font-semibold h-8 px-4 border border-gray-400 rounded `}
            disabled={loginDisabled}
            onClick={() => login()}
          >
            Create your Mach Stat account
          </button>
        </div>
      </div>
      {/* <div className=" mx-auto mt-5">
        <div className="relative mx-auto rounded-md overflow-hidden w-[23rem] shadow-inner border ">
          <div className=" relative flex justify-between pt-1 pl-6">
            <div className="flex items-end h-10">
              <div className="  font-poppins text-gray-600 " style={{ fontSize: "14px" }}>Login</div>
            </div>
          </div>
          <div className=" px-6">
            <div className=" ">
              <div className="flex items-center pt-4 ">
                <input
                  value={data?.username || ''}
                  onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))}
                  ref={usernameRef}
                  type="text"
                  disabled={fieldsDisabled}
                  className={"h-8 w-full font-inter rounded text-xs border px-2 focus:outline-none mt-0 text-gray-600 shadow"}
                  style={{ fontSize: "14px" }}
                  onFocus={() => setFocussedEl("username")}
                  autoFocus
                  placeholder="Username"
                />
              </div>
              <div className="flex items-center pt-4 ">
                <input
                  value={data?.password || ''}
                  onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
                  onKeyDown={e => (e.key === "Enter" ? login() : "")}
                  type="password"
                  disabled={fieldsDisabled}
                  className={"h-8 w-full font-inter rounded text-xs border px-2 focus:outline-none mt-0 text-gray-600 shadow"}
                  style={{ fontSize: "14px" }}
                  onFocus={() => setFocussedEl("password")}
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="pt-4 ">
              <button
                className={"flex justify-center items-center h-7  w-20  text-sm  rounded text-white " + (loginDisabled ? "bg-gray-300 cursor-default" : " bg-[#2480D8] hover:bg-orange-400 hover:shadow ")}
                disabled={loginDisabled}
                onClick={() => login()}
              >
                Continue
              </button>
              <div className={"text-xs pl-2 font-poppins py-1 rounded bg-whitea text-[#C85550] " + (authError && (authError !== "Unauthenticated.") ? "" : "hidden")}>
                <span>{err}</span>
              </div>
              <div className={"text-xs pl-2 font-inter rounded text-green-500 " + ((isPingingServer || isAuthWaiting) ? "" : "hidden")} >
                <span><IconLoading className="animate-spin " width="18" color="rgb(59, 59, 59)" /></span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Login