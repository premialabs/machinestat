import React, { useContext, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { TabContainer, Tab, TabPane, Panel } from "../../../_core/components";
import CompanyLayout from './Layout/company.layout';
import GlobalStateContext from '../../../_core/providers/GlobalStateContext';
import EventBus from "../../../_core/utilities/event-bus"
import { Helmet } from 'react-helmet-async';
import company_api from "./_company.api";

const CompanyScreen = (props) => {
  let id = useParams().id;
  const theme = "blue";
  const containerRef = useRef();
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    globalState.write("Company", {});
    EventBus.on("loadHeader", (refresh_id) => {
      globalState.write("Company", {});
      refreshData("Company", refresh_id);
    }
    );

    return () => {
      EventBus.remove("loadHeader");
    }
  }, [])

  const refreshData = async (dataSource, parent_id) => {
    globalState.setLoadingSource(dataSource)
    let data = '';
    let _res = '';
    switch (dataSource) {
      case "Company":
        try {
          EventBus.dispatch("headerLoading", "");
          EventBus.dispatch("loadingStarted", dataSource);
          globalState.write(dataSource, {});
          console.log('-------refreshData/get------');
          _res = await company_api.get(parent_id);
          data = _res.data.data;
          globalState.write(dataSource, data);
          globalState.setLoadingSource();
          EventBus.dispatch("headerLoadingDone", parent_id);
          EventBus.dispatch("loadingFinished");
        } catch (err) {
          EventBus.dispatch("headerLoadingError", "");
        }
        break;

      // case "SampleOrderLine":
      //   try {
      //     EventBus.dispatch("loadingStarted", dataSource);
      //     _res = await sample_order_line_api.getPOLines(parent_id, 0, 0);
      //     data = _res.data.data;
      //     globalState.write(dataSource, data);
      //     globalState.setLoadingSource();
      //     EventBus.dispatch("loadingFinished");
      //   } catch (err) {
      //     console.log(err.message)
      //   }
      //   break;

      // case "SampleOrderCharge":
      //   try {
      //     globalState.setLoadingSource();
      //   } catch (err) {
      //     console.log(err.message)
      //   }
      //   break;

      default:
        break;
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Company - ${id}`}</title>
      </Helmet>
      <div id='xxx' className=" w-full " ref={containerRef}>
        <div className="font-montserrat text-md font-semibold text-ss-900 px-2 my-2">
          {`Company ` + (globalState.loadingSource === "Company" ? "" : `# ${id}`)}
        </div>
        <Panel name="Header">
          <CompanyLayout
            parent=""
            parentId={id}
            name="Company"
            containerRef={containerRef}
            data={globalState.read("Company")}
            refreshData={async (id) => refreshData("Company", id)}
            className="mt-4 mb-8 px-2"
            theme={theme}
            disabled={globalState.headerIsLoading}
          />
        </Panel>
        <Panel className="px-2" name="CompanyDetails">
          <TabContainer>
            {/* <Tab target="tabSampleOrderLine" label="PO Lines" active /> */}
            {/* <Tab target="tabSampleOrderCharge" label="Charges" />
          <Tab target="tabPoAddressInfo" label="Addres Info" disabled />
          <Tab target="tabPoJournal" label="PO Journal" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab1" label="Another Tab 1" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab2" label="Another Tab With Long Name" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab3" label="Another Tab 3" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab4" label="Let's Make It Little Bigger" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab5" label="Another Tab 5" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab6" label="Another Tab 6" disabled={globalState.headerIsLoading} /> */}

            <TabPane name="tabSampleOrderLine" >
              {/* <SampleOrderLineLayout
                parent="SampleOrder"
                parentId={id}
                name="SampleOrderLine"
                containerRef={containerRef}
                refreshData={async (id) => refreshData("SampleOrderLine", id)}
                theme={theme}
                disabled={globalState.headerIsLoading}
              /> */}
            </TabPane>
            {/* <TabPane name="tabSampleOrderCharge">
            <SampleOrderChargeView
              parent="SampleOrder"
              parentId={id}
              name="SampleOrderCharge"
              containerRef={containerRef}
              refreshData={async (id) => refreshData("SampleOrderCharge", id)}
              theme={theme}
              disabled={globalState.headerIsLoading}
            />
          </TabPane>
          <TabPane name="tabPoJournal">
            <PoJournalView
              parent="SampleOrder"
              parentId={id}
              name="PoJournal"
              containerRef={containerRef}
              refreshData={async (id) => refreshData("PoJournal", id)}
              theme={theme}
              disabled={globalState.headerIsLoading}
            />
          </TabPane> */}
          </TabContainer>
        </Panel>
      </div>
    </>
  )
}

export default CompanyScreen;
