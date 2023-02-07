const baseTheme = {
  button: {
    primary: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    secondary: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    warning: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    danger: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    transparent: {
      enabled: "py-1 text-xs font-roboto rounded text-white border shadow hover:shadow-md",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    default: {
      enabled: "py-1 text-xs font-roboto rounded text-black border hover:shadow",
      disabled: "py-1 text-xs font-roboto rounded text-gray-400 border "
    },
    custom: {
      enabled: " ",
      disabled: "  "
    }
  },
  link: {
    enabled: "text-xs font-roboto underline text-blue-400",
    disabled: "text-xs font-roboto text-gray-500 "
  },
  textBox: {
    enabled: "h-7 border rounded px-1 focus:outline-sky-300 font-roboto",
    disabled: "h-7 border rounded px-1 disabled focus:outline-none font-roboto"
  },
  simpleDropDown: {
    enabled: "h-7 border rounded text-xs px-1 focus:outline-sky-300 font-roboto",
    disabled: "h-7 border rounded text-xs px-1 disabled focus:outline-none font-roboto"
  },
  standardTable: {
    commandBarButton: {
      enabled: "text-xs px-2 rounded py-1 font-roboto hover:shadow cursor-pointer ",
      disabled: "text-xs px-2 rounded py-1 font-roboto cursor-default "
    },
    sideBarButton: {
      enabled: " rounded-full hover:bg-zinc-100 cursor-pointer ",
      disabled: " opacity-50 cursor-default "
    },
    sideBarButtonColor: {
      enabled: " #3d76b8 ",
      disabled: " lightgray "
    },
    header: " border-b border-slate-100 ",
    sideBar: " mr-1 ",
    headerText: " text-gray-500 font-roboto text-xs leading-6 font-semibold ",
    bodyText: "antialiased font-publicSans font-medium text-gray-800 text-pxs antialiased leading-6 "
  },
  title: {
    screenTitle: " font-poppins font-semibold text-md  text-[#0369A1] px-2 mt-2 mb-2 "
  }

};

const theme = {
  button: {
    primary: {
      enabled: baseTheme.button.primary.enabled + " border-sky-800 bg-sky-800 hover:bg-sky-800 hover:border-white ",
      disabled: baseTheme.button.primary.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    secondary: {
      enabled: baseTheme.button.secondary.enabled + " border-gray-400 hover:border-gray-600 bg-gradient-to-b from-gray-400 hover:from-gray-600 to-gray-600 hover:bg-gray-700a hover:border-whitea ",
      disabled: baseTheme.button.secondary.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    warning: {
      enabled: baseTheme.button.warning.enabled + " border-yellow-600 bg-yellow-600 hover:bg-yellow-700 hover:border-white ",
      disabled: baseTheme.button.warning.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    danger: {
      enabled: baseTheme.button.danger.enabled + " border-orange-700 bg-orange-700 hover:bg-orange-700 hover:border-white ",
      disabled: baseTheme.button.danger.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    transparent: {
      enabled: baseTheme.button.default.enabled + " border-0 hover:from-gray-300 hover:border-gray-300 ",
      disabled: baseTheme.button.default.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    default: {
      enabled: baseTheme.button.default.enabled + " border-gray-200 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:border-gray-300 ",
      disabled: baseTheme.button.default.disabled + " border-gray-200 bg-gray-200 pointer-events-none "
    },
    custom: {
      enabled: " ",
      disabled: "  "
    }
  },
  link: {
    enabled: baseTheme.link.enabled + "",
    disabled: baseTheme.link.disabled + ""
  },
  standardTable: {
    commandBarButton: {
      enabled: baseTheme.standardTable.commandBarButton.enabled + "",
      disabled: baseTheme.standardTable.commandBarButton.disabled + ""
    },
    sideBarButton: {
      enabled: baseTheme.standardTable.sideBarButton.enabled + "",
      disabled: baseTheme.standardTable.sideBarButton.disabled + ""
    },
    sideBarButtonColor: {
      enabled: baseTheme.standardTable.sideBarButtonColor.enabled + "",
      disabled: baseTheme.standardTable.sideBarButtonColor.disabled + ""
    },
    header: baseTheme.standardTable.header + "",
    sideBar: baseTheme.standardTable.sideBar + "",
    headerText: baseTheme.standardTable.headerText + "",
    bodyText: baseTheme.standardTable.bodyText + ""
  },
  textBox: {
    enabled: baseTheme.textBox.enabled + "",
    disabled: baseTheme.textBox.disabled + ""
  },
  simpleDropDown: {
    enabled: baseTheme.simpleDropDown.enabled + "",
    disabled: baseTheme.simpleDropDown.disabled + ""
  },
  title: {
    screenTitle: baseTheme.title.screenTitle + ""
  }
};

export default theme;