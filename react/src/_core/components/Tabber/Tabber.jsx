import React, { Children, useState } from "react";
// import { useSearchParams } from "react-router-dom";

export const TabContainer = (props) => {
  let _tab = Children.toArray(props.children).filter(child => {
    return child.props.active
  }
  )
  const [selectedTab, setSelectedTab] = useState(
    _tab
      .reduce((acc, curr) => {
        if (curr.props.active) {
          return curr.props.target;
        } else {
          return ""
        }
      }, "")
  )

  return (
    <div className={props.className}>
      {
        Children.map(props.children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              disabled: child.props.disabled,
              active: (selectedTab === child.props.target),
              selectedTab: selectedTab,
              setSelectedTab: setSelectedTab,
              firstTab: (index === 0)
            });
          }
          return child;
        })
      }
    </div>
  )
}

export const Tab = (props) => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const alterSearchParams = (val) => {
  //   let _tabs = searchParams.get("tabs")
  //   if (_tabs && Array.isArray(_tabs.split("^"))) {

  //   }
  // }
  return (
    <button
      onClick={() => {
        // alterSearchParams(props.target)
        props.setSelectedTab(props.target)
      }}
      className={" px-2 py-2 font-inter font-semibold border-b-2 " + (props.active ? " border-sky-500 text-sky-700 " : " border-gray-50 hover:bg-gray-100 text-gray-600 " + (props.disabled ? " text-gray-300 pointer-events-none " : ""))}
      style={{ fontSize: '9pt' }}
    >
      {props.label}
    </button>
  )
}

export const TabPane = (props) => {
  return (
    <div className={props.className + " mt-4 " + (props.selectedTab === props.name ? "" : "hidden")}>
      {
        Children.map(props.children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              disabled: child.props.disabled,
              active: (props.selectedTab === props.name),
            });
          }
          return child;
        })
      }
    </div>
  )
}