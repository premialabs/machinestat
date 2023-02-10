import { Helmet } from "react-helmet-async";
import { useContext, useRef, useState } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import DeviceOverviewLayout from "./Layout/device-overview.layout"
import { random } from "lodash";

export default () => {
    const containerRef = useRef();
    const [page, setPage] = useState(1);
    const pageSize = 5;
    let globalState = useContext(GlobalStateContext)
    const [data, setData] = useState(
        [

            { id: 2, _seq: 200, _line_no: 2, type: "Temperature", device_id: random(10000000, 99999999), last_data: "2022-10-28 / 07:05:35", heartbeat: "online" },
            { id: 1, _seq: 100, _line_no: 1, type: "Temperature", device_id: random(10000000, 99999999), last_data: "2022-10-26 / 17:00:05", heartbeat: "fault" },
            { id: 3, _seq: 300, _line_no: 3, type: "Temperature", device_id: random(10000000, 99999999), last_data: "2022-10-28 / 07:05:35", heartbeat: "frozen" },
            { id: 4, _seq: 400, _line_no: 4, type: "Temperature", device_id: random(10000000, 99999999), last_data: "2022-10-28 / 07:05:35", heartbeat: "online" },
            { id: 1, _seq: 100, _line_no: 1, type: "Temperature", device_id: random(10000000, 99999999), last_data: "2022-10-28 / 07:05:35", heartbeat: "offline" },
        ]
    );

    const pager = {
        current: page,
        pageSize: pageSize,
        goToFirst: () => setPage(1),
        goToPrevious: () => setPage(page => page - 1),
        goToNext: () => setPage(page => page + 1),
        goToLast: () => { }
    }

    const refreshData = async (dataSource, parent_id) => {
        // try {
        //     globalState.setLoadingSource(dataSource)
        //     EventBus.dispatch("loadingStarted", dataSource);
        //     let _res = await company_api.query(page, pageSize, {});
        //     let data = _res.data.data;
        //     globalState.write(dataSource, data);
        //     globalState.setLoadingSource();
        //     EventBus.dispatch("loadingFinished");
        // } catch (err) {
        //     console.error(err.message)
        // }
    }

    const doSearch = async (tokens) => {
        // try {
        //     globalState.setLoadingSource("Company")
        //     EventBus.dispatch("loadingStarted", "Company");
        //     let _res = await company_api.query(1, pageSize, tokens);
        //     let data = _res.data.data;
        //     globalState.write("Company", data);
        //     globalState.setLoadingSource();
        //     EventBus.dispatch("loadingFinished");
        // } catch (err) {
        //     console.error(err.message)
        // }
    }

    return (
        <>
            <Helmet>
                <title>Device</title>
            </Helmet>
            <div ref={containerRef} className="w-1/2">
                <DeviceOverviewLayout
                    pager={pager}
                    parent=""
                    parentId=""
                    name="Company"
                    containerRef={containerRef}
                    data={data}
                    refreshData={async (id) => refreshData("Company", id)}
                    doSearch={doSearch}
                    className="mt-4 mb-8 px-2"
                    disabled={globalState.headerIsLoading}
                />
            </div>
        </>
    )
}