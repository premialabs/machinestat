import CompanyForm from "./company-dialog.layout";
import { IconEdit, IconPlus } from "../../../../_core/utilities/svg-icons"
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";
import { useContext, useEffect } from "react";
import { DialogBoxContext } from "../../../../_core/providers/DialogBoxContext";
import { DialogBoxConstants } from "../../../../_core/components/DialogBox/DialogBoxPlaceholder";
import { ToastContext } from "../../../../_core/providers/ToastContext";
import { SectionCommandBar } from "../../../../_core/components"
import { formatDate } from "../../../../_core/utilities/date-formatting";

const CompanyLayout = (props) => {
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
    globalState.write("activeDataSource", "Company")
    let params = {
      data: { ...globalState.read(props.name) },
      selectedLines: "line_selections",
      mode: "edit"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<CompanyForm />, window_size, params, cmdEdit_callback);
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
    DialogBox.showModal(<CompanyForm />, window_size, params, cmdCreate_callback);
  }

  // const prepareDelete = () => {
  // }

  let sectionCommandBarButtons = [
    {
      caption: "Edit",
      callback: prepareEdit,
      icon: <IconEdit />,
      disabled: !globalState.read(props.name)
    },
    {
      caption: "New",
      callback: prepareCreate,
      icon: <IconPlus />,
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
            <label className="block text-xs">PO No</label>
            <input type="text" className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50" value={props.data?.po_no || ''} disabled />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Created Date</label>
            <input type="text" className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50" value={formatDate(props.data?.created_date) || ''} disabled />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Delivery Date</label>
            <input type="text" className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50" value={formatDate(props.data?.delivery_date) || ''} disabled />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Status</label>
            <input type="text" className="h-7 w-full rounded-md border text-sm px-1 disabled:bg-gray-50" value={props.data?.status || ''} disabled />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyLayout;