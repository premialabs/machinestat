import { useContext } from "react";
import { Link } from "react-router-dom";
import { StandardTable } from "../../../../_core/components/PremiaTables"
import GlobalStateContext from "../../../../_core/providers/GlobalStateContext";
import { IconDuplicate, IconEdit, IconMagnifyingGlass, IconPlus, IconTrash } from "../../../../_core/utilities/svg-icons";

export default (props) => {
    let globalState = useContext(GlobalStateContext)

    const tableConfig = {
        general: {
            showGrandSum: false,
            showFilterSum: false,
            addSystemButtonsToSideBar: true
        },
        columns: [
            {
                name: 'id',
                label: 'id',
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
                name: 'type',
                label: 'Type',
                type: 'string',
                align: 'left',
                length: 60,
                decimals: 0,
                visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
                autosum: false,
                filter: true,
                format: (rowIndex, id, value) => value
            },
            {
                name: 'device_id',
                label: 'Device ID',
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
                name: 'last_data',
                label: 'Last Data',
                type: 'date',
                align: 'left',
                length: 130,
                decimals: 0,
                visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
                autosum: false,
                filter: true,
                format: (rowIndex, id, value) => value
            },
            {
                name: 'heartbeat',
                label: 'Status',
                type: 'string',
                align: 'center',
                length: 30,
                decimals: 0,
                visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
                autosum: false,
                filter: true,
                format: (rowIndex, id, value) => value
            },
        ]
    };

    const commandBarButtons = [];

    const columnFormatter = (column_name, id, value) => {
        let ret = value;
        let color = "";
        if (column_name === "heartbeat") {
            switch (value) {
                case "offline":
                    color = "w-2 h-2 bg-orange-500 rounded-full";
                    break;
                case "online":
                    color = "w-2 h-2 bg-green-500 rounded-full";
                    break;
                case "frozen":
                    color = "w-2 h-2 bg-blue-500 rounded-full";
                    break;
                case "fault":
                    color = "w-2 h-2 bg-red-500 rounded-full animate-ping";
                    break;
                default:
                    color = "w-2 h-2 bg-gray-500 rounded-full";
                    break;
            }
        }

        switch (column_name) {
            case "heartbeat":
                ret = <div className="flex justify-center" title={value}><div className={color}></div></div>
                break;
            case "device_id":
                ret = <Link className="text-blue-500 ani" to={`/devices/${value}`}>{value}</Link>
                break;

            default:
                break;
        }
        return ret;
    }

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

    const commandBarInquireHandler = (data, setData, selectedLines, action) => {
    }

    const commandBarActionHandler = (data, setData, selectedLines, action) => {
    }

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

    const prepareCreate = async (seq, positioning) => {
        // let params = {
        //   title: "Create Company",
        //   current_sequence: seq,
        //   positioning: positioning,
        //   mode: "create"
        // };
        // let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
        // DialogBox.showModal(<CompanyDialog />, window_size, params, cmdNewRecord_callback);
    }

    const prepareEdit = async (rec, setSelectedLines) => {
        // let params = {
        //   title: "Edit Company",
        //   data: rec,
        //   mode: "edit"
        // };
        // let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/12";
        // DialogBox.showModal(<CompanyDialog />, window_size, params, cmdEditRecord_callback);
    }

    const sideBarActionHandler = async (data, setData, selectedLines, setSelectedLines, action) => {
        console.log('sideBarActionHandler()');
        switch (action) {
            case "cmdNewRecord":
                let max_seq = 0;
                if (globalState.read("Company") && globalState.read("Company").length > 0) {
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

    const cmdDeleteSelected_Clicked = async (data, setData, selectedLines, setSelectedLines) => {
        //   let ret = window.confirm('Are you sure you want to delete the selected lines?');
        //   let availableRecs = [...globalState.read(props.name)];
        //   if (ret) {
        //     try {
        //       [...selectedLines].forEach(async (id) => {
        //         await company_api.delete(id);
        //         availableRecs = availableRecs.filter(item => item.id !== id)
        //         globalState.write(props.name, availableRecs)
        //         setSelectedLines(prev => prev.filter(item => item !== id))
        //       })
        //     } catch (err) {
        //       // setApiErrors(JSON.parse(decodeError(err)))
        //     }
        //   }
    }

    const prepareSearch = () => {
        // DialogBox.showSearchModal({ title: "Company", callback: cmdSearch_callback });
    }

    const doDetailSearch = (tokens) => {
        alert(tokens);
    }

    return (
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
    )
}