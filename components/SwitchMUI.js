import React from "react";
import { useState } from "react";
import Switch from "@mui/material/Switch";

export default function SwitchMUI({deviceId,devicePin}){
  const [switchChecked, setSwitchChecked] = useState(true);

    const handleSwitchChange = (event) => {
        setSwitchChecked(event.target.checked);
      };
      console.log(deviceId,devicePin)
  return (
    <Switch
      sx={{ marginLeft: "30px", marginTop: "10px" }}
      checked={switchChecked}
      onChange={handleSwitchChange}
      inputProps={{
        "aria-label": "controlled",
      }}
    />
  );
};

