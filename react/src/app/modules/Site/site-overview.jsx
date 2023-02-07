import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import EventBus from "../../../_core/utilities/event-bus";
import site_api from "./_site.api";
import SiteOverviewLayout from "./Layout/site-overview.layout";
import theme from "./../../../_core/theme";

const SiteOverview = (props) => {
  const containerRef = useRef();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    globalState.write("Site", []);

    EventBus.on("loadHeader", (refresh_id) => {
      globalState.write("Site", []);
      refreshData("Site", refresh_id);
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
    refreshData("Site", null);
  },[page])

  const refreshData = async (dataSource, parent_id) => {
    try {
      globalState.setLoadingSource(dataSource)
      EventBus.dispatch("loadingStarted", dataSource);
      let _res = await site_api.query(page, pageSize, {});
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
      globalState.setLoadingSource("Site")
      EventBus.dispatch("loadingStarted", "Site");
      let _res = await site_api.query(1, pageSize, tokens);
      let data = _res.data.data;
      globalState.write("Site", data);
      globalState.setLoadingSource();
      EventBus.dispatch("loadingFinished");
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>Overview - Sites</title>
      </Helmet>
      <div className={theme.title.screenTitle}>
        Sites
      </div>
      <div ref={containerRef} className=" ">
        <SiteOverviewLayout
          pager={pager}
          parent=""
          parentId=""
          name="Site"
          containerRef={containerRef}
          data={globalState.read("Site")}
          refreshData={async (id) => refreshData("Site", id)}
          doSearch={doSearch}
          className="mt-4 mb-8 px-2"
          disabled={globalState.headerIsLoading}
        />
      </div>
    </>
  )
}

export default SiteOverview;