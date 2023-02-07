import SiteDialog from "./site-dialog.layout";
import { useContext, useEffect } from "react";
import { formatDate } from "../../../../_core/utilities/date-formatting";
import { IconEdit, IconPlus } from "../../../../_core/utilities/svg-icons";
import { SectionCommandBar, TextField } from "../../../../_core/components";
import { ToastContext } from "../../../../_core/providers/ToastContext";
import { DialogBoxConstants } from "../../../../_core/components/DialogBox";
import { DialogBoxContext } from "../../../../_core/providers/DialogBoxContext";
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";

const SiteLayout = (props) => {
  const globalState = useContext(GlobalStateContext)
  let DialogBox = useContext(DialogBoxContext);
  let Toast = useContext(ToastContext)

  // let {
  //   parentId: props_parentId,
  //   refreshData: props_refreshData
  // } = props;

  // useEffect(() => {
  //   props_refreshData(props_parentId);
  // }, [props_parentId])

  const cmdEdit_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      globalState.write(props.name, data)
      // Toast.show(<span>Updated</span>, Toast.Constants.Type.Success, Toast.Constants.ModeOfClose.Auto)
    }
  }

  const prepareEdit = () => {
    globalState.write("activeDataSource", "Site")
    let params = {
      data: { ...globalState.read(props.name) },
      selectedLines: "line_selections",
      mode: "edit"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<SiteDialog />, window_size, params, cmdEdit_callback);
  }

  const cmdCreate_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      if (data.redirect) {
        // globalState.write(props.name, data.content)
      } else {
        Toast.show(<span className="font-nunito"><a className="underline" href={`/sampleOrders/${data.content.po_no}`}>{`Sample Order ${data.content.po_no}`}</a> {`successfully created.`}</span>, Toast.Constants.Type.Success, Toast.Constants.ModeOfClose.Auto, 4000)
      }
    }
  }

  const prepareCreate = async () => {
    //   globalState.write("activeDataSource", "SampleOrder")
    //   let res = await sample_order_api.prepareCreate();
    let params = {
      data: {},
      mode: "create"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/6";
    DialogBox.showModal(<SiteDialog />, window_size, params, cmdCreate_callback);
  }

  // const prepareDelete = () => {
  // }

  let sectionCommandBarButtons = [
    {
      caption: "Edit",
      callback: prepareEdit,
      icon: <IconEdit color="white" />,
      disabled: !globalState.read(props.name)
    },
    {
      caption: "New",
      callback: prepareCreate,
      icon: <IconPlus color="white" />,
      disabled: false
    },
    // {
    //   caption: "Delete",
    //   callback: prepareDelete,
    //   icon: <IconTrash />,
    //   disabled: false
    // }
  ]

  return (
    <>
      <SectionCommandBar
        section={props.name}
        buttons={sectionCommandBarButtons}
      />
      <div className={props.className}>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          <div className="font-inter">
            <label className="block text-xs">Code</label>
            {/* <input
              type="text"
              className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50"
              value={props.data?.po_no || ''}
              disabled
            /> */}
            {/* <TextField
              apiError={error}
              name="code"
              value={props.data?.code ? props.data.code : ""}
              title="Code"
              disabled={true}
              className="text-gray-800 text-sm col-span-2"
              textAlign="left"
              isUpperCase={true}
              onChangeCallback={onChange}
              onBlurCallback={() => { }}
            /> */}
          </div>
          <div className="font-inter">
            <label className="block text-xs">Description</label>
            <input type="text" className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50" value={formatDate(props.data?.created_date) || ''} disabled />
          </div>
        </div>
      </div>
    </>
  )
}

export default SiteLayout;