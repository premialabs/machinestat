import { useContext, useEffect, useState } from "react";
import { DialogBoxContext } from "../../../_core/providers/DialogBoxContext";
import SampleOrderLineForm from "./SampleOrderLineForm";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import sample_order_line_api from "./sample_order_line_api";
import { decodeError } from "../../../_core/utilities/exception-handler";
import EventBus from "../../../_core/utilities/event-bus"
import { IconPlus, IconDuplicate, IconEdit, IconTrash } from "../../../_core/utilities/svg-icons";
import { StandardTable } from "../../../_core/components/PremiaTables";

const SampleOrderLineLayout = (props) => {
  let DialogBox = useContext(DialogBoxContext);
  let globalState = useContext(GlobalStateContext)
  const [apiErrors, setApiErrors] = useState({})

  useEffect(() => {
    EventBus.on("headerLoading", () => {
      globalState.write(props.name, []);
    });

    EventBus.on("headerLoadingDone", (id) => {
      props.active && props.refreshData(id);
    });

    return () => {
      EventBus.remove("headerLoadingDone");
      EventBus.remove("headerLoading");
    }
  }, [])

  const columnFormatter = (column_name, value) => {
    let ret = value;
    //
    return ret;
  }

  const commandBarButtons = [
    {
      label: "Release",
      action: "cmdRelease"
    },
    {
      label: "Create Invoice",
      action: "cmdCreateInvoice"
    },
    {
      label: "View Purchasing History",
      action: "cmdSendToIfs"
    }
  ];

  const sideBarButtons = [
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
    }
  ];

  const lineMenus = [
    {
      label: "Insert Above",
      action: "menuInsertAbove",
      params: ["id"]
    }, {
      label: "Insert Below",
      action: "menuInsertBelow",
      params: ["id"]
    }, {
      label: "Open Detail View",
      action: "menuOpenLineDetail",
      params: ["id", "_seq_"]
    },
    {
      label: "Show Invoice",
      action: "menuShowInvoice",
      params: ["id", "_seq_"]
    },
    {
      label: "Transfer to IFS",
      action: "menuTransferToIfs",
      params: ["id", "_seq_"]
    }
  ];

  const tableConfig = {
    general: {
      showGrandSum: true,
      showFilterSum: true,
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
        autosum: false
      },
      {
        name: '_seq_',
        label: '_seq_',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
        autosum: false
      },
      {
        name: '_line_no_',
        label: 'Line No',
        type: 'number',
        align: 'left',
        length: 70,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'part_code',
        label: 'Part Code',
        type: 'string',
        align: 'left',
        length: 90,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'part_description',
        label: 'Part Description',
        type: 'string',
        align: 'left',
        length: 270,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
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
      {
        name: 'delivery_date',
        label: 'Delivery Date',
        type: 'date',
        align: 'left',
        length: 270,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
      },
      {
        name: 'status',
        label: 'Status',
        type: 'string',
        align: 'left',
        length: 80,
        decimals: 0,
        visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
        autosum: false
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

  const lineMenuActionHandler = (action, params) => {
    console.log('lineMenuActionHandler()');
    switch (action) {
      case "menuInsertAbove":
        lineMenuInsert(params, "above");
        break;
      case "menuInsertBelow":
        lineMenuInsert(params, "below");
        break;
      case "menuOpenLineDetail":
        alert(params);
        break;

      default:
        break;
    }
  }

  const lineMenuInquireHandler = (action, id) => {
    console.log('lineMenuInquireHandler()');
    switch (action) {
      case "menuInsertAbove":
        return true;
      case "menuInsertBelow":
        return true;
      case "menuOpenLineDetail":
        return true;

      default:
        return false;
    }
  }

  const commandBarInquireHandler = (data, setData, selectedLines, action) => {
    console.log('commandBarInquireHandler()');
    if (props.disabled) {
      return false;
    } else {
      if (selectedLines.length > 0) {
        switch (action) {
          case "cmdRelease":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Planned")
            }, true);

          case "cmdCreateInvoice":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Released")
            }, true);

          case "cmdSendToIfs":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Closed")
            }, true);

          case "cmdSendToProm":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (["Released", "Closed"].includes(curr.status))
            }, true);

          default:
            return false;
        }
      } else {
        return false;
      }
    }
  }

  const commandBarActionHandler = (data, setData, selectedLines, action) => {
    alert(selectedLines, action)
  }

  const sideBarInquireHandler = (data, setData, selectedLines, action) => {
    console.log('sideBarInquireHandler()');
    if (props.disabled) {
      return false;
    } else {
      switch (action) {
        case "cmdNewRecord":
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

  const sideBarActionHandler = async (data, setData, selectedLines, setSelectedLines, action) => {
    console.log('sideBarActionHandler()');
    switch (action) {
      case "cmdNewRecord":
        let max_seq = 0;
        if (globalState.read("SampleOrderLine").length > 0) {
          max_seq = Math.max(...globalState.read("SampleOrderLine").map(item => item._seq_));
        }
        await prepareCreate(max_seq, "bottom");
        break;
      case "cmdEditSelected":
        await prepareEdit(data.filter(item => item.id === selectedLines[0])[0], setSelectedLines);
        break;
      case "cmdDuplicateSelected":
        cmdDuplicateSelected_Clicked(data.filter(item => item.id === selectedLines[0])[0], "below", setSelectedLines);
        break;
      case "cmdDeleteSelected":
        await cmdDeleteSelected_Clicked(data, setData, selectedLines, setSelectedLines);
        break;
      default:
        break;
    }
  }

  const doSearch = (token) => {
    alert("please write search logic");
  }

  const doDetailSearch = (tokens) => {
    alert("please write detail search logic");
  }

  const prepareCreate = async (seq, positioning) => {
    let params = {
      parent_id: globalState.read(props.parent).id,
      current_sequence: seq,
      positioning: positioning,
      mode: "new",
      refreshData: async () => props.refreshData(globalState.read(props.parent).id)
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<SampleOrderLineForm />, window_size, params, cmdNewRecord_callback);
  }

  const cmdNewRecord_callback = async (result, data) => {
    return null;
  }

  const prepareEdit = async (data, setSelectedLines) => {
    let params = {
      data: data,
      mode: "edit",
      refreshData: async () => props.refreshData(globalState.read(props.parent).id),
      clearSelectedLines: () => setSelectedLines([])
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<SampleOrderLineForm />, window_size, params, cmdEditRecord_callback);
  }

  const cmdEditRecord_callback = async (result, data) => {
    return null;
  }

  const lineMenuInsert = async ([id], positioning) => {
    let curr_seq = [...globalState.read("SampleOrderLine")]?.filter(item => item.id === id).map(item => item._seq_)[0];
    await prepareCreate(curr_seq, positioning);
  }

  const cmdDuplicateRecord_callback = async (result, data) => {
  }

  const cmdDuplicateSelected_Clicked = (data, positioning, setSelectedLines) => {
    let params = {
      data: data,
      current_sequence: data._seq_,
      positioning: positioning,
      mode: "duplicate",
      refreshData: async () => props.refreshData(globalState.read(props.parent).id),
      clearSelectedLines: () => setSelectedLines([])
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<SampleOrderLineForm />, window_size, params, cmdDuplicateRecord_callback);
  }

  const cmdDeleteSelected_Clicked = async (data, setData, selectedLines, setSelectedLines) => {
    let ret = window.confirm('Are you sure you want to delete the selected lines?');
    let availableRecs = [...globalState.read(props.name)];
    if (ret) {
      try {
        [...selectedLines].forEach(async (id) => {
          await sample_order_line_api.delete(id);
          availableRecs = availableRecs.filter(item => item.id !== id)
          globalState.write(props.name, availableRecs)
          setSelectedLines(prev => prev.filter(item => item !== id))
        })
      } catch (err) {
        setApiErrors(JSON.parse(decodeError(err)))
      }
    }
  }

  return (
    <StandardTable
      configuration={tableConfig}                         // configuration: table and column configuration details      
      style={tableStyle}                                  // style: table styling details      
      theme={props.theme}                                 // theme: specifies which theme to be applied
      data={globalState.read(props.name)}                 // data: data      
      dataSource={props.name}                             // dataSource: data source in which the table has been attached to
      loadingSource={globalState.loadingSource}           // loadingDataSource: current loading data source
      refreshData={props.refreshData}                     // refreshData: callback to refresh data
      columnFormatter={columnFormatter}

      lineMenu={lineMenus}                                // lineMenu: line menu configurations      
      lineMenuInquireHandler={lineMenuInquireHandler}     // lineMenuInquireHandler: line menu inquire handler callback      
      lineMenuActionHandler={lineMenuActionHandler}       // lineMenuActionHandler: line menu action handler callback      

      commandBarButtons={commandBarButtons}               // commandBarButtons: command bar configuration      
      commandBarInquireHandler={commandBarInquireHandler} // commandBarInquireHandler: command bar inquire callback      
      commandBarActionHandler={commandBarActionHandler}   // commandBarActionHandler: command bar action handler callback      

      sideBarButtons={sideBarButtons}                     // sideBarButtons: side bar configuration      
      sideBarInquireHandler={sideBarInquireHandler}       // sideBarInquireHandler: side bar inquire callback      
      sideBarActionHandler={sideBarActionHandler}         // sideBarActionHandler: side bar action handler callback      

      containerRef={props.containerRef}                   // containerRef: used in column resizing when table is resized
      doSearch={doSearch}                                 // doSearch:			            search callback      
      doDetailSearch={doDetailSearch}                     // doDetailSearch:			      detail search callback
      disabled={props.disabled}                           // disabled: disables all button actions
    />
  )
}

export default SampleOrderLineLayout;