import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@mui/material";
import get from "lodash.get";
import axios from "axios";
import CustomTextField from "../../@core/components/mui/text-field";

const FormSelect = (props) => {
  const [options, setOptions] = useState([]);
  console.log("options", options)
  useEffect(() => {
    if (props?.options) {
      setOptions(props?.options);
    } else {
      axios.get(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}${props.endPoint}`, {
        params: { ...props.params },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then((data) => setOptions(data.data)).catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    console.log('options', options)
  },[options])

  return (
    <CustomTextField label={props.label} className="w-100" {...props} id='custom-select' select >
      {options.map((option) => (
        <MenuItem key={get(option, props.valueItem)} value={get(option, props.valueItem)}>
          {get(option, props.titleItem)}
        </MenuItem>
      ))}
    </CustomTextField>
  );
};

export default FormSelect;
