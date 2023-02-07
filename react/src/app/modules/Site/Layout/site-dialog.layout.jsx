import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";
import { decodeError } from "../../../../_core/utilities/exception-handler";
import { IconLoading } from "../../../../_core/utilities/svg-icons";
import { DialogBoxConstants } from "../../../../_core/components/DialogBox";
import { Button, ColorField, TextField } from "../../../../_core/components";
import site_api from "../_site.api";
import { SimpleDropDown } from "../../../../_core/components/DropDown";

const SiteDialogLayout = (props) => {
  const globalState = useContext(GlobalStateContext)
  let navigate = useNavigate();
  const [localData, setLocalData] = useState(props.data);
  const [status, setStatus] = useState("")
  const [error, setError] = useState()
  const { mode, data } = props

  useEffect(() => {
    if (mode === "edit") {
      globalState.write("activeDataSource", "Site")
      let res = '';
      (async () => {
        setStatus("loading")
        res = await site_api.prepareEdit(data.id);
        setLocalData({ ...res.data.data })
        setStatus("")
      })();
    } else if (mode === "create") {
      globalState.write("activeDataSource", "Site")
      let res = '';
      (async () => {
        setStatus("loading")
        res = await site_api.prepareCreate();
        setLocalData({ ...res.data.data })
        setStatus("")
      })();
    }
  }, [mode])

  const save = async (redirect) => {
    try {
      setStatus("waiting")
      if (mode === "create") {
        let res = await site_api.create(localData)
        setStatus("success")
        if (redirect) {
          navigate(`/enterp/sites/${res.data.data.id}`);
          props.callback(DialogBoxConstants.Result.Ok, { redirect: true, content: res.data.data })
        } else {
          props.callback(DialogBoxConstants.Result.Ok, { redirect: false, content: res.data.data })
        }
      } else {
        let res = await site_api.update(props.data.id, localData)
        setStatus("success")
        props.callback(DialogBoxConstants.Result.Ok, res.data.data)
      }
    } catch (err) {
      setStatus("error");
      setError(JSON.parse(decodeError(err)));
    }
  }

  const onChange = (e) => {
    setLocalData(prev => {
      return (
        { ...prev, [e.target.name]: e.target.value }
      )
    })
  }

  return (
    <div className={" relative bg-white w-full h-full " + props.className}>
      <div className={"absolute w-full h-full flex items-center " + (["loading", "waiting"].includes(status) ? "" : "hidden")}>
        <div className="w-32 h-10 mx-auto rounded border bg-white shadow flex justify-center">
          <IconLoading width="15" color="blue" className="animate-spin" />
        </div>
      </div>
      <div className="font-inter px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-2 pt-4">
        <div className=" 2xl:col-span-3">
          <label className="font-inter block text-xs pb-1">Company</label>
          <SimpleDropDown
            name="company_ref"
            value={localData?.company_ref}
            optionKey="id"
            optionValue="code,description"
            data={localData?.companies}
            className="w-full"
            apiError={error}
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
        <div className=" 2xl:col-span-2">
          <label className="block text-xs pb-1">Calendar Color</label>
          <ColorField
            name="color"
            value={localData?.color ? localData.color : ""}
            title="Calendar Color"
            disabled={false}
            className="text-gray-800 text-sm col-span-2"
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
      </div>
      <div className="font-inter px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-2 pt-4">
        <div className=" 2xl:col-span-2">
          <label className="block text-xs pb-1">Code</label>
          <TextField
            apiError={error}
            name="code"
            value={localData?.code ? localData.code : ""}
            title="Code"
            disabled={false}
            className="text-gray-800 text-sm col-span-2"
            textAlign="left"
            isUpperCase={true}
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
        <div className=" 2xl:col-span-3">
          <label className="block text-xs pb-1">Description</label>
          <TextField
            apiError={error}
            name="description"
            value={localData?.description ? localData.description : ""}
            title="Description"
            disabled={false}
            className="text-gray-800 text-sm col-span-2"
            textAlign="left"
            onChangeCallback={onChange}
            onBlurCallback={() => { }}
          />
        </div>
      </div>
      <div className={"bg-gray-100a flex items-center w-full p-2 mt-3 justify-end"}>
        <Button
          text="Save"
          disabled={["waiting", "success", "loading"].includes(status) ? true : false}
          callback={() => save(false)}
          className="px-2"
        />
      </div>
      {/* <pre>
        {
          JSON.stringify(localData,null,2)
        }
      </pre> */}
    </div>
  )
}

export default SiteDialogLayout;