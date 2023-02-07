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
import SiteDialog from "./site-dialog.layout";
import site_api from "../_site.api";

const SiteOverviewLayout = (props) => {
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
      case "code":
        ret = <Link to={`${id}`}>{value}</Link>
        break;
      case "color":
        ret = <div className="mx-auto w-3 h-3 rounded-full" style={{backgroundColor: value}}></div>
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
      {
        name: 'color',
        label: 'Calendar Color',
        type: 'string',
        align: 'center',
        length: 30,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false,
        filter: false,
        format: (rowIndex, id, value) => {
          return (
            <div className=" h-3 w-3 rounded-full " style = {{backgroundColor: value}} >
              
            </div>
          )
        }
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
      props.refreshData("Site");
    }
  }

  const cmdEditRecord_callback = async (result, data) => {
    if (result !== DialogBoxConstants.Result.Close) {
      props.refreshData("Site");
    }
  }

  const prepareCreate = async (seq, positioning) => {
    let params = {
      title: "Create Site",
      current_sequence: seq,
      positioning: positioning,
      mode: "create"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
    DialogBox.showModal(<SiteDialog />, window_size, params, cmdNewRecord_callback);
  }

  const prepareEdit = async (rec, setSelectedLines) => {
    let params = {
      title: "Edit Site",
      data: rec,
      mode: "edit"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
    DialogBox.showModal(<SiteDialog />, window_size, params, cmdEditRecord_callback);
  }

  const cmdDeleteSelected_Clicked = async (data, setData, selectedLines, setSelectedLines) => {
    let ret = window.confirm('Are you sure you want to delete the selected lines?');
    let availableRecs = [...globalState.read(props.name)];
    if (ret) {
      try {
        [...selectedLines].forEach(async (id) => {
          await site_api.delete(id);
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
    DialogBox.showSearchModal({ title: "Site", callback: cmdSearch_callback });
  }

  const sideBarActionHandler = async (data, setData, selectedLines, setSelectedLines, action) => {
    switch (action) {
      case "cmdNewRecord":
        let max_seq = 0;
        if (globalState.read("Site")  && globalState.read("Site").length > 0) {
          max_seq = Math.max(...globalState.read("Site").map(item => item._seq_));
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
    <div className="w-full 2xl:w-4/6  overflow-hidden ">
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

        sideBarButtons={null}                     // sideBarButtons: side bar configuration      
        sideBarInquireHandler={sideBarInquireHandler}       // sideBarInquireHandler: side bar inquire callback      
        sideBarActionHandler={sideBarActionHandler}         // sideBarActionHandler: side bar action handler callback      

        containerRef={props.containerRef}                   // containerRef: used in column resizing when table is resized
        doSearch={props.doSearch}                           // doSearch:			            search callback      
        doDetailSearch={doDetailSearch}                     // doDetailSearch:			      detail search callback
        disabled={props.disabled}                           // disabled: disables all button actions
        isPaginatorVisible={false}
      />
    </div>
  )
}

export default SiteOverviewLayout;