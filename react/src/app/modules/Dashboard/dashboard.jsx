import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import GlobalStateContext from "../../../_core/providers/GlobalStateContext";
import dashboard_api from "./_dashboard.api";
import DashboardLayout from "./Layout/dashboard.layout";
import theme from "../../../_core/theme";

const Dashboard = (props) => {
  const containerRef = useRef();
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    globalState.write("Equipment", []);

  }, [])
  const graph_data = {
    radial_bar_data : [
        {
          name: 'TEST',
          uv: 31.47,
          pv: 2400,
          fill: '#FFFFFF',
        },
        {
          name: 'EPE',
          uv: 6.69,
          pv: 1567,
          fill: '#4F46E5',
        },
        {
          name: 'MGO',

          uv: 11.69,
          pv: 1398,
          fill: '#0EA5E9',
        },
        {
          name: 'ISH',
          uv: 9.47,
          pv: 5800,
          fill: '#10B981',
        },
        // {
        //   name: '40-49',
        //   uv: 8.63,
        //   pv: 3908,
        //   fill: '#a4de6c',
        // },
        // {
        //   name: '50+',
        //   uv: 2.63,
        //   pv: 4800,
        //   fill: '#d0ed57',
        // },
        // {
        //   name: 'unknow',
        //   uv: 6.67,
        //   pv: 4800,
        //   fill: '#ffc658',
        // },
      ],
      analysis_bar_data : [
        {
          name: "EPE",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "MGO",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "GLA",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "ALP",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "MGLG",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "BDL",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "KPH",
          uv: 3490,
          pv: 4300,
          amt: 2100
        },
        {
          name: "ISH",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ],
      generation_mix_data : [
        {
          name: 'JAN',
          EPE: 4000,
          MGO: 2400,
          ISH: 1400,
          amt: 2400,
        },
        {
          name: 'FEB',
          EPE: 3000,
          MGO: 1398,
          ISH: 1400,
          amt: 2210,
        },
        {
          name: 'MAR',
          EPE: 2000,
          MGO: 9800,
          ISH: 1400,
          amt: 2290,
        },
        {
          name: 'APR',
          MGO: 3908,
          ISH: 1400,
          amt: 2000,
        },
        {
          name: 'MAY',
          EPE: 1890,
          MGO: 4800,
          ISH: 1400,
          amt: 2181,
        },
        {
          name: 'JUM',
          EPE: 2390,
          MGO: 3800,
          ISH: 1400,
          amt: 2500,
        },
        {
          name: 'JUL',
          EPE: 3490,
          MGO: 4300,
          ISH: 1400,
          amt: 2100,
        },
        {
          name: 'AUG',
          EPE: 3490,
          MGO: 4300,
          ISH: 1400,
          amt: 2100,
        }
      ],
      line_data :[
        {
          name: '2014',
          EPE: 4000,
          MGO: 2400,
          amt: 2400,
        },
        {
          name: '2015',
          EPE: 3000,
          MGO: 1398,
          amt: 2210,
        },
        {
          name: '2016',
          EPE: 2000,
          MGO: 9800,
          amt: 2290,
        },
        {
          name: '2017',
          EPE: 2780,
          MGO: 3908,
          amt: 2000,
        },
        {
          name: '2018',
          EPE: 1890,
          MGO: 4800,
          amt: 2181,
        },
        {
          name: '2019',
          EPE: 2390,
          MGO: 3800,
          amt: 2500,
        },
        {
          name: '2020',
          EPE: 3490,
          MGO: 4300,
          amt: 2100,
        },
      ],
      delayd_wo_data :[
        {"job_card_no" : "00335",
         "description" : "Magal Ganga Generator ",
        "site":"EPE",
        "due_date" : "22-Sep-2022",
        "delay_color" : "#EDE574"
       },
       {"job_card_no" : "00201",
       "description" : "Ellapita Ella Forebay Gate",
       "site":"EPE",
       "due_date" : "12-Sep-2022",
       "delay_color" : "#F9D423"
      },
      {"job_card_no" : "00197",
       "description" : "Hulu Ganga Circuit Breaker",
        "site":"EPE",
        "due_date" : "07-Aug-2022",
        "delay_color" : "#FC913A"
      },
      {"job_card_no" : "00180",
      "description" : "Magal Ganga Battery Bank",
      "site":"EPE",
      "due_date" : "28-Jun-2022",
      "delay_color" : "#FF4E50"
    },


      ]
}
  


  // const refreshData = async (dataSource, parent_id) => {
  //   try {
  //     globalState.setLoadingSource(dataSource)
  //     EventBus.dispatch("loadingStarted", dataSource);
  //     let _res = await equipment_api.query(page, pageSize, {});
  //     let data = _res.data.data;
  //     globalState.write(dataSource, data);
  //     globalState.setLoadingSource();
  //     EventBus.dispatch("loadingFinished");
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }


  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={theme.title.screenTitle}>
      </div>
      <div ref={containerRef} className="">
        <DashboardLayout
          //pager={}
          parent=""
          parentId=""
          name="Equipment"
          containerRef={containerRef}
          data={graph_data}
          //refreshData={async (id) => refreshData("Equipment", id)}
          //doSearch={doSearch}
          className="mt-4 mb-8 px-2"
          disabled={globalState.headerIsLoading}
        />
      </div>
    </>
  )
}

export default Dashboard;