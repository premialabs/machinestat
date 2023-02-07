import React from "react"
import { Button } from "../index.js"

const SectionCommandBar = (props) => {

  return (
    <div className={"flex font-montserrat text-sm font-semibold p-2 " + props.className}  >
      {
        props.buttons && props.buttons.map((button, index) =>
          <Button
            variant={button.variant}
            className="mr-2 px-2"
            key={index}
            text={button.caption}
            disabled={button.disabled}
            callback={button.callback}
            icon={{ component: button.icon, width: button.iconWidth, color: button.iconColor }}
          />
        )
      }
    </div>
  )
}

export default SectionCommandBar