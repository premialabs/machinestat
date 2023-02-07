import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import EventBus from "../../../_core/utilities/event-bus";
import CompanyOverviewLayout from "./Layout/company-overview.layout";
import company_api from "./_company.api";
import theme from "./../../../_core/theme";

const CompanyOverviewScreen = (props) => {
  const containerRef = useRef();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    globalState.write("Company", []);

    EventBus.on("loadHeader", (refresh_id) => {
      globalState.write("Company", []);
      refreshData("Company", refresh_id);
    }
    );

    return () => {
      EventBus.remove("loadHeader");
    }
  }, [])

  const pager = {
    current: page,
    pageSize: pageSize,
    goToFirst: () => setPage(1),
    goToPrevious: () => setPage(page => page - 1),
    goToNext: () => setPage(page => page + 1),
    goToLast: () => { }
  }

  useEffect(() => {
    refreshData("Company", null);
  },[page])

  const refreshData = async (dataSource, parent_id) => {
    try {
      globalState.setLoadingSource(dataSource)
      EventBus.dispatch("loadingStarted", dataSource);
      let _res = await company_api.query(page, pageSize, {});
      let data = _res.data.data;
      globalState.write(dataSource, data);
      globalState.setLoadingSource();
      EventBus.dispatch("loadingFinished");
    } catch (err) {
      console.error(err.message)
    }
  }

  const doSearch = async (tokens) => {
    try {
      globalState.setLoadingSource("Company")
      EventBus.dispatch("loadingStarted", "Company");
      let _res = await company_api.query(1, pageSize, tokens);
      let data = _res.data.data;
      globalState.write("Company", data);
      globalState.setLoadingSource();
      EventBus.dispatch("loadingFinished");
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>Overview - Companies</title>
      </Helmet>
      <div className={theme.title.screenTitle}>
        {`Companies`}
      </div>
      <div ref={containerRef} className=" ">
        <CompanyOverviewLayout
          pager={pager}
          parent=""
          parentId=""
          name="Company"
          containerRef={containerRef}
          data={globalState.read("Company")}
          refreshData={async (id) => refreshData("Company", id)}
          doSearch={doSearch}
          className="mt-4 mb-8 px-2"
          disabled={globalState.headerIsLoading}
        />
      </div>
    </>
  )
}

export default CompanyOverviewScreen;