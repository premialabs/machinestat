import { useContext } from "react";
import { Link } from "react-router-dom";
import React, { PureComponent } from 'react';
import { IconClock } from  "../../../../_core/utilities/svg-icons";
import { RadialBarChart, RadialBar, Bar, BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

const DashboardLayout = (props) => {
  //let globalState = useContext(GlobalStateContext)

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 py-2 ">
      <div className="h-80  rounded-lg bg-white shadow-sm">
        <div className="w-full rounded-lg bg-white text-gray-900 font-poppins  px-4 pt-4 " style={{fontSize:'14px'}}>Overall Plant Factor
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart width="100" height="100%" cx="50%" cy="40%" innerRadius="5%" outerRadius="100%" barSize={15} data={props.data.radial_bar_data}>
            <RadialBar minAngle={15} background={{ fill: "#FAFAFA" }} clockWise   dataKey="uv" />
            <Legend iconSize={10}    width={100}    height={100}   layout="vertical"   verticalAlign="left" wrapperStyle={{ top: "1px", left: "15px", lineHeight: "24px", fontFamily: 'inter', fontSize:'11px'}} />
          </RadialBarChart>
        </ResponsiveContainer>
     </div>

     <div className="h-80  rounded-lg bg-white shadow-sm">
     <div className="w-full rounded-lg bg-white text-gray-900 font-poppins  px-4 pt-4 " style={{fontSize:'14px'}}>WO Delay Analysis
        </div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width="100%" height="100%"  data={props.data.analysis_bar_data}  margin={{ top: 20, right: 30,   left: 10,  bottom: 30  }}  >
          {/* <CartesianGrid strokeDasharray="2 2" /> */}
          <XAxis dataKey="name" tick={{ fontFamily: 'inter', fontSize:'10px' }} axisLine={false}/>
          {/* <YAxis yAxisId="left" orientation="left" stroke="#8884d8"  tick={{ fontFamily: 'inter', fontSize:'10px' }} /> */}
          {/* <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"  tick={{ fontFamily: 'inter', fontSize:'10px' }}/> */}
          <Tooltip />
          <Bar yAxisId="left" dataKey="pv" fill="#8884d8" barSize={25}  radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
     </div>

     <div className="h-80 md:col-span-2 lg:col-span-1  rounded-lg bg-white shadow-sm">
      <div className="w-full rounded-lg bg-white text-gray-900 font-poppins  px-4 pt-4 " style={{fontSize:'14px'}}>Generation Mix
          </div>
      <ResponsiveContainer width="100%" height="100%">
          <BarChart  width={500}  height={100} data={props.data.generation_mix_data}   margin={{ top: 20,  right: 30,  left: 10, bottom: 30 }}  >
            {/* <CartesianGrid strokeDasharray="2 2" /> */}
            <XAxis dataKey="name" tick={{ fontFamily: 'inter', fontSize:'10px' }} axisLine={false}/>
            {/* <YAxis tick={{ fontFamily: 'inter', fontSize:'10px' }}/> */}
            <Tooltip />
            {/* <Legend layout="vertical"  wrapperStyle={{ top: "2px", left: "5px", lineHeight: "24px", fontFamily: 'inter', fontSize:'10px'}}/> */}
            <Bar dataKey="EPE" stackId="a" fill="#8884d8" barSize={25} radius={[0, 0, 0, 0]}/>
            <Bar dataKey="MGO" stackId="a" fill="#82ca9d" barSize={25}/>
            <Bar dataKey="ISH" stackId="a" fill="#35B4ED" barSize={25} radius={[5, 5, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
     </div>

     <div className="h-80 md:col-span-2 lg:col-span-1  rounded-lg bg-white shadow-sm">
     <div className="w-full rounded-lg bg-white text-gray-900 font-poppins  px-4 pt-4" style={{fontSize:'14px'}}>Power Factor Variation By Site
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart  width={500}  height={230}  data={props.data.line_data}    margin={{top: 20, right: 35, left: 0,   bottom: 40  }}  >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tick={{ fontFamily: 'inter', fontSize:'10px' }} axisLine={false}/>
          <YAxis tick={{ fontFamily: 'inter', fontSize:'10px' }} axisLine={false}/>
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="EPE" stroke="#8884d8" activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="MGO" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
     </div>

      <div className="h-80 grid gap-2 grid-cols-1" >
        <div className="w-full h-30  rounded-lg bg-white  shadow-sm">
        <div className="w-full rounded-lg bg-white text-gray-900 font-poppins  px-4 pt-4 " style={{fontSize:'14px'}}>Over Due Work Orders
        </div>
          <div className="grid grid-cols-1 pt-2  w-full">
            {
              props.data.delayd_wo_data.map((item, key) => {
                return (
                  
                  <div className="flex justify-between pl-4 pr-6 pt-4 pb-2 text-poppins text-xs" key={key}>
                    <div className="flex items-center">
                    <IconClock className="h-5 w-5"  color={item.delay_color} />
                      {/* <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-[${item.delay_color}]  font-poppins text-medium ` } >
                        {item.job_card_no}
                      </div> */}
                      <div className="pl-4">
                        <div className="font-poppins text-xs text-medium">{item.job_card_no}</div>
                        <div className="font-poppins text-xs text-gray-500">{item.description}</div>
                      </div>
                    </div>
                    <div>
                      <span className="font-poppins text-xs text-medium">{item.due_date}</span>
                    </div>
   
                  </div>
                  
                )
              })
            }
            <div className="flex justify-end pt-2">
              <span className="font-poppins text-[#6667EB] pr-6" style={{fontSize:"11px"}}>View All Work Orders</span>
            </div>

          </div>
        </div>
      </div>
      <div className="h-80 grid gap-2 grid-cols-1" >
        <div className="h-30  rounded-lg bg-white shadow-sm">
          <div className="p-2">
            < span className="px-2 py-1 border bg-orange-400 font-robotto font-medium text-white rounded-md"  style={{ fontSize: '10px' }}>DUE BY NEXT WEEK</span>
          </div>
        </div>
        <div className="h-30 borer rounded-lg bg-white">
          <div className="p-2">
            < span className="px-2 py-1 border bg-green-400 font-robotto font-medium text-white rounded-md"  style={{ fontSize: '10px' }}>READY</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboardLayout;