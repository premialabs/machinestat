import React, { useEffect, useState, useRef } from "react"
import { Helmet } from "react-helmet-async";
import system_parameter_api from "../../api/system_parameter_api";

const SystemParameters = () => {
  const [isListFetching, setIsListFetching] = useState(false);
  const [sysParams, setSysParams] = useState();
  const [pageNo, setPageNo] = useState(1);
  const pageSize = useRef(10);

  useEffect(() => {
    (async () => {
      setIsListFetching(true);
      let sys_param_res = await system_parameter_api.index({ page_no: pageNo, page_size: pageSize.current });
      setSysParams(sys_param_res.data.data);
      setIsListFetching(false);
    })();
  }, [])

  const setData = (index, name, value) => {

  }

  return (
    <>
      <Helmet>
        <title>System Parameters</title>
      </Helmet>
      <div className="w-full p-2 rounded overflow-hidden">
        <h1>System Parameters</h1>
        <table className="mt-3">
          <thead>
            <tr className="font-roboto text-xs h-7 font-semibold text-gray-600">
              <td className="px-1 w-72">Parameter</td>
              <td className="px-1 w-80">Description</td>
              <td className="px-1 w-52">Value</td>
            </tr>
          </thead>
          <tbody>
            {
              sysParams && Array.isArray(sysParams) &&
              sysParams.map((param, index) => <Row key={index} data={param} setData={setData} rowNum={index} />)
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

const Row = ({ data, setData, rowNum }) => {
  return (
    <tr className="font-roboto text-sm h-7">
      <td className="border px-1">{data.code}</td>
      <td className="border px-1">{data.description}</td>
      <td className="border px-1"><input type={data.value_type === "date" ? "date" : "text"} value={data.value} className="px-1 focus:outline-none" /></td>
    </tr>
  )
}

export default SystemParameters;