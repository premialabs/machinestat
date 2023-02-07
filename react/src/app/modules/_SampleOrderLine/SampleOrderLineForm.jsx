import { useEffect, useState } from "react";
import { DialogBoxConstants } from "../../../_core/components/DialogBox/DialogBoxPlaceholder";
import sample_order_line_api from "./sample_order_line_api";
import { decodeError } from "../../../_core/utilities/exception-handler"
import { IconLoading } from "../../../_core/utilities/svg-icons";
import { Button } from "../../../_core/components";

const SampleOrderLineForm = (props) => {
  const [localData, setLocalData] = useState({ ...props.data });
  const [apiPreparing, setApiPreparing] = useState(false);
  const [apiCreating, setApiCreating] = useState(false);
  const [apiErrors, setApiErrors] = useState({})
  const [isBtnSaveDisabled, setIsBtnSaveDisabled] = useState(false)

  useEffect(() => {
    const { parent_id, current_sequence, positioning } = props;
    (async () => {
      try {
        let res = "";
        setApiPreparing(true)
        if (props.mode === "new") {
          res = await sample_order_line_api.prepareCreate(parent_id, current_sequence, positioning);
        } else if (props.mode === "edit") {
          res = await sample_order_line_api.prepareEdit(props.data.id);
        } else if (props.mode === "duplicate") {
          res = await sample_order_line_api.prepareDuplicate(props.data.id);
        }
        setLocalData(res.data.data)
      } catch (err) {
        setApiErrors(JSON.parse(decodeError(err)))
      } finally {
        setApiPreparing(false)
      }
    })();
  }, [])

  useEffect(() => {
    setIsBtnSaveDisabled(apiPreparing || apiCreating)
  }, [apiPreparing, apiCreating])

  const save = async () => {
    try {
      let res = "";
      setApiCreating(true);
      if (["new", "duplicate"].includes(props.mode)) {
        res = await sample_order_line_api.create(localData);
      } else {
        res = await sample_order_line_api.update(props.data.id, localData);
        props.clearSelectedLines()
      }
      props.refreshData();
      props.callback(DialogBoxConstants.Result.Ok, localData);
    } catch (err) {
      setApiErrors(decodeError(err))
      setApiCreating(false);
    }
  }

  return (
    <div className="w-full bg-white font-inter text-sm">
      <div className="grid grid-cols-6 gap-2 p-2">
        <div className="col-span-2">
          <label className="block text-xs">Part Code</label>
          <input
            id="part_code"
            type="text"
            value={localData.part_code || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("part_code")) && <div className="text-xs text-red-600 mt-1">{apiErrors.part_code}</div>}
        </div>
        <div className="col-span-4">
          <label className="block text-xs">Part Description</label>
          <input
            id="part_description"
            type="text"
            value={localData.part_description || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("part_description")) && <div className="text-xs text-red-600 mt-1">{apiErrors.part_description}</div>}
        </div>
        <div className="col-span-2 mt-3">
          <label className="block text-xs">Delivery Date</label>
          <input
            id="delivery_date"
            type="date"
            value={localData.delivery_date || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("delivery_date")) && <div className="text-xs text-red-600 mt-1">{apiErrors.delivery_date}</div>}
        </div>
      </div>
      <div className="bg-ss-100 w-full p-2 text-right text-xs mt-3">
        {/* <Button
          variant="primary"
          className="mr-2 h-7 px-2"
          text="Refresh"
          callback={() => refresh()}
          icon={{ component: <IconRefresh />, width: 10 }}
        /> */}

        <Button
          variant="primary"
          className="h-7 px-6"
          text={(apiCreating ? <span>Saving...</span> : <span>Save</span>)}
          disabled={isBtnSaveDisabled}
          animate={(apiPreparing || apiCreating)}
          callback={() => save()}
        />
      </div>
    </div>
  )
}
export default SampleOrderLineForm;