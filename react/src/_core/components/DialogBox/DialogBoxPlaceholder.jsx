import React, { useContext, useState } from "react"
import { DialogBoxContext } from "../../providers/DialogBoxContext"
import { IconTimes, IconWindowMaximize, IconWindowRestore } from "../../utilities/svg-icons"

export const DialogBoxConstants = {
  Result: {
    Ok: "ok",
    Cancel: "cancel",
    Close: "close"
  }
}

export const DialogBoxPlaceholder = (props) => {
  const windowSizes = {
    Default: props.windowSize,
    Maximized: " sm:w-full sm:max-w-full h-dlg-height"
  }
  const [windowSize, setWindowSize] = useState(windowSizes.Default)
  let DialogBox = useContext(DialogBoxContext);

  const dlgCallback = (result, data) => {
    props.callback(result, data, DialogBox.stack)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ zIndex: props.windowId }}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className={"inline-block  " + (windowSize === windowSizes.Maximized ? " h-screen " : "rounded-lg") + " text-left overflow-hidden shadow-lg transform transition-all sm:align-middle " + (windowSize)}>
          <div className="bg-white w-full">
            <div className={`flex sm:justify-between items-center px-4 pt-3 pb-2`}>
              <div className="text-black font-poppins text-sm  px-2">{props.params.title}</div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    if (windowSize === windowSizes.Default) {
                      setWindowSize(windowSizes.Maximized)
                    }
                    if (windowSize === windowSizes.Maximized) {
                      setWindowSize(windowSizes.Default)
                    }
                  }}
                  type="button"
                  className={`h-8 w-8  text-xs font-inter hover:bg-gray-800`}
                >
                  {
                    windowSize === windowSizes.Maximized
                      ? <IconWindowMaximize className="mx-auto" color="#a4a4a4" stroke="gray" width="12" />
                      : <IconWindowRestore className="mx-auto" color="#a4a4a4" width="12" />
                  }
                </button>
                <button
                  onClick={() => props.callback(DialogBoxConstants.Result.Close, {}, DialogBox.stack)}
                  type="button"
                  className={"h-8 w-8  text-center " + (windowSize === windowSizes.Maximized ? "" : "rounded-tr") + " bg-gradient-to-b text-xs font-inter hover:from-red-600 hover:to-red-600 hover:shadow-md hover:text-black"}
                >
                  <IconTimes className="mx-auto" color="#a4a4a4" width="18" />
                </button>
              </div>
            </div>
            <hr></hr>
            <div className="sm:flex sm:items-start w-full">
              <div className="text-center sm:mt-0 sm:text-left  w-full">
                <DynamicComponent component={props.component} callback={(result, data) => dlgCallback(result, data)} {...props.params} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

const DynamicComponent = (props) => {
  return React.cloneElement(props.component, {
    ...props
  })
}
