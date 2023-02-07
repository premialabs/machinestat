import { useContext } from "react";
import { Link } from "react-router-dom";
import { DialogBoxConstants } from "../../../../_core/components/DialogBox";
import { StandardTable } from "../../../../_core/components/PremiaTables";
import { DialogBoxContext } from "../../../../_core/providers/DialogBoxContext";
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";
import {
  IconPlus,
  IconDuplicate,
  IconEdit,
  IconTrash,
  IconMagnifyingGlass
} from "../../../../_core/utilities/svg-icons";
import CompanyDialog from "./company-dialog.layout";
import company_api from "../_company.api";

const CompanyOverviewLayout = (props) => {
  let globalState = useContext(GlobalStateContext)
  let DialogBox = useContext(DialogBoxContext);
  // let {
  //   parentId: props_parentId,
  //   refreshData: props_refreshData
  // } = props;

  // useEffect(() => {
  //   props_refreshData(props_parentId);
  // }, [props_parentId])

  const columnFormatter = (column_name, id, value) => {
    let ret = value;
    switch (column_name) {
      case "po_no":
        ret = <Link to={`${value}`}>{value}</Link>
        break;

      default:
        break;
    }
    return ret;
  }

  const commandBarButtons = [
    // {
    //   label: "Release",
    //   action: "cmdRelease"
    // },
    // {
    //   label: "Create Invoice",
    //   action: "cmdCreateInvoice"
    // },
    // {
    //   label: "View Purchasing History",
    //   action: "cmdSendToIfs"
    // }
  ];

  const tableConfig = {
    general: {
      showGrandSum: false,
      showFilterSum: false,
      addSystemButtonsToSideBar: true
    },
    columns: [
      {
        name: 'id',
        label: 'ID',
        type: 'number',
        align: 'center',
        length: 30,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false,
        filter: false,
        format: (rowIndex, id, value) => value
      },
      {
        name: '_seq',
        label: '_seq',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false,
        filter: false,
        format: (rowIndex, id, value) => value
      },
      {
        name: '_line_no',
        label: 'Line No',
        type: 'number',
        align: 'left',
        length: 60,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false,
        filter: false,
        format: (rowIndex, id, value) => value
      },
      {
        name: 'code',
        label: 'Code',
        type: 'string',
        align: 'left',
        length: 20,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false,
        filter: true,
        format: (rowIndex, id, value) => value
      },
      // {
      //   name: 'created_date',
      //   label: 'Created Date',
      //   type: 'date',
      //   align: 'left',
      //   length: 270,
      //   decimals: 0,
      //   visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: false
      // },
      // {
      //   name: 'supplier',
      //   label: 'Supplier',
      //   type: 'object',
      //   align: 'left',
      //   length: 320,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   select: ['code', 'description'],
      //   concatChar: " - ",
      //   autosum: false
      // },
      // {
      //   name: 'delivery_date',
      //   label: 'Delivery Date',
      //   type: 'date',
      //   align: 'left',
      //   length: 270,
      //   decimals: 0,
      //   visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: false
      // },
      {
        name: 'description',
        label: 'Description',
        type: 'string',
        align: 'left',
        length: 100,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false,
        filter: true,
        format: (rowIndex, id, value) => value
      },
      // {
      //   name: 'tax',
      //   label: 'Tax',
      //   type: 'currency',
      //   align: 'right',
      //   length: 70,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: true
      // },
      // {
      //   name: 'amount',
      //   label: 'Amount',
      //   type: 'currency',
      //   align: 'right',
      //   length: 70,
      //   decimals: 0,
      //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      //   autosum: true
      // },
    ]
  };

  const tableStyle = {
    baseStyle: {
      commandBarButton: {
        enabled: "text-xs px-2 rounded py-1 font-roboto hover:shadow cursor-pointer",
        disabled: "text-xs px-2 rounded py-1 font-roboto cursor-default"
      },
      sideBarButton: {
        enabled: "  rounded-full hover:bg-gray-200 cursor-pointer",
        disabled: " opacity-50 cursor-default"
      }
    },
    yellow: {
      commandBarButton: {
        enabled: "golden-yellow text-black",
        disabled: "bg-ss-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    },
    blue: {
      commandBarButton: {
        enabled: "border border-blue-300 bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300",
        disabled: "border border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    },
    dark: {
      commandBarButton: {
        enabled: "bg-gray-800 text-gray-100",
        disabled: "bg-ss-100 text-gray-400"
      },
      sideBarButton: {
        enabled: "",
        disabled: ""
      }
    }
  };

  const sideBarButtons = [
    {
      label: "Search",
      action: "cmdSearch",
      icon: IconMagnifyingGlass
    },
    {
      label: "New",
      action: "cmdNewRecord",
      icon: IconPlus
    },
    {
      label: "Duplicate",
      action: "cmdDuplicateSelected",
      icon: IconDuplicate
    },
    {
      label: "Edit",
      action: "cmdEditSelected",
      icon: IconEdit
    },
    {
      label: "Delete",
      action: "cmdDeleteSelected",
      icon: IconTrash
    },
  ];

  const sideBarInquireHandler = (data, setData, selectedLines, action) => {
    if (props.disabled) {
      return false;
    } else {
      switch (action) {
        case "cmdNewRecord":
          return true;

        case "cmdSearch":
          return true;

        case "cmdDuplicateSelected":
          return (selectedLines.length === 1 ? true : false);

        case "cmdEditSelected":
          return (selectedLines.length === 1 ? true : false);

        case "cmdDeleteSelected":
          return (selectedLines.length > 0 ? true : false);

        default:
          return false;
      }
    }
  }

  const cmdNewRecord_callback = async (result, data) => {
    if (result !== DialogBoxConstants.Result.Close) {
      props.refreshData("Company");
    }
  }

  const cmdEditRecord_callback = async (result, data) => {
    if (result !== DialogBoxConstants.Result.Close) {
      props.refreshData("Company");
    }
  }

  const prepareCreate = async (seq, positioning) => {
    let params = {
      title: "Create Company",
      current_sequence: seq,
      positioning: positioning,
      mode: "create"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
    DialogBox.showModal(<CompanyDialog />, window_size, params, cmdNewRecord_callback);
  }

  const prepareEdit = async (rec, setSelectedLines) => {
    let params = {
      title: "Edit Company",
      data: rec,
      mode: "edit"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
    DialogBox.showModal(<CompanyDialog />, window_size, params, cmdEditRecord_callback);
  }

  const cmdDeleteSelected_Clicked = async (data, setData, selectedLines, setSelectedLines) => {
    let ret = window.confirm('Are you sure you want to delete the selected lines?');
    let availableRecs = [...globalState.read(props.name)];
    if (ret) {
      try {
        [...selectedLines].forEach(async (id) => {
          await company_api.delete(id);
          availableRecs = availableRecs.filter(item => item.id !== id)
          globalState.write(props.name, availableRecs)
          setSelectedLines(prev => prev.filter(item => item !== id))
        })
      } catch (err) {
        // setApiErrors(JSON.parse(decodeError(err)))
      }
    }
  }

  const cmdSearch_callback = async (result, data) => {
    props.doSearch(data);
  }

  const prepareSearch = () => {
    DialogBox.showSearchModal({ title: "Company", callback: cmdSearch_callback });
  }

  const sideBarActionHandler = async (data, setData, selectedLines, setSelectedLines, action) => {
    console.log('sideBarActionHandler()');
    switch (action) {
      case "cmdNewRecord":
        let max_seq = 0;
        if (globalState.read("Company")  && globalState.read("Company").length > 0) {
          max_seq = Math.max(...globalState.read("Company").map(item => item._seq_));
        }
        await prepareCreate(max_seq, "bottom");
        break;
      case "cmdEditSelected":
        await prepareEdit(data.filter(item => item.id === selectedLines[0])[0], setSelectedLines);
        break;
      case "cmdDuplicateSelected":
        // cmdDuplicateSelected_Clicked(data.filter(item => item.id === selectedLines[0])[0], "below", setSelectedLines);
        break;
      case "cmdDeleteSelected":
        await cmdDeleteSelected_Clicked(data, setData, selectedLines, setSelectedLines);
        break;
      
      case "cmdSearch":
        prepareSearch();
        break;
      
      default:
        break;
    }
  }

  const commandBarInquireHandler = (data, setData, selectedLines, action) => {
    // if (props.disabled) {
    //   return false;
    // } else {
    //   if (selectedLines.length > 0) {
    //     switch (action) {
    //       case "cmdRelease":
    //         return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
    //           return acc && (curr.status === "Planned")
    //         }, true);

    //       case "cmdCreateInvoice":
    //         return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
    //           return acc && (curr.status === "Released")
    //         }, true);

    //       case "cmdSendToIfs":
    //         return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
    //           return acc && (curr.status === "Closed")
    //         }, true);

    //       case "cmdSendToProm":
    //         return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
    //           return acc && (["Released", "Closed"].includes(curr.status))
    //         }, true);

    //       default:
    //         return false;
    //     }
    //   } else {
    //     return false;
    //   }
    // }
  }

  const commandBarActionHandler = (data, setData, selectedLines, action) => {
    // alert(selectedLines, action)
  }

  const doDetailSearch = (tokens) => {
    alert(tokens);
  }

  return (
    <div className="w-full ">
      <StandardTable
        pager={props.pager}
        configuration={tableConfig}                         // configuration: table and column configuration details      
        data={props.data}                                   // data: data      
        dataSource={props.name}                             // dataSource: data source in which the table has been attached to
        loadingSource={globalState.loadingSource}           // loadingDataSource: current loading data source
        columnFormatter={columnFormatter}

        lineMenu={false}                                    // lineMenu: line menu configurations      
        lineMenuInquireHandler={null}                       // lineMenuInquireHandler: line menu inquire handler callback      
        lineMenuActionHandler={null}                        // lineMenuActionHandler: line menu action handler callback      

        commandBarButtons={commandBarButtons}               // commandBarButtons: command bar configuration      
        commandBarInquireHandler={commandBarInquireHandler} // commandBarInquireHandler: command bar inquire callback      
        commandBarActionHandler={commandBarActionHandler}   // commandBarActionHandler: command bar action handler callback      

        sideBarButtons={sideBarButtons}                     // sideBarButtons: side bar configuration      
        sideBarInquireHandler={sideBarInquireHandler}       // sideBarInquireHandler: side bar inquire callback      
        sideBarActionHandler={sideBarActionHandler}         // sideBarActionHandler: side bar action handler callback      

        containerRef={props.containerRef}                   // containerRef: used in column resizing when table is resized
        doSearch={props.doSearch}                           // doSearch:			            search callback      
        doDetailSearch={doDetailSearch}                     // doDetailSearch:			      detail search callback
        disabled={props.disabled}                           // disabled: disables all button actions
      />
    </div>
  )
}

export default CompanyOverviewLayout;