import {TextField} from "@mui/material";
import React from "react";
import {isEmpty} from "../utils/Utils";

type ConfigField = {
  label: string,
  editing: boolean,
  value: string,
  tempValue: string,
  setTempValue:React.Dispatch<React.SetStateAction<string>>,
  tempValueError: boolean,
  setTempValueError: React.Dispatch<React.SetStateAction<boolean>>,
}

const ConfigField = ({label, tempValueError, setTempValueError, editing, value, tempValue, setTempValue}: ConfigField) => {

  const handleChange = (
    setTempValue: (value: React.SetStateAction<string>) => void,
    setTempValueError: (value: React.SetStateAction<boolean>) => void,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTempValue(event.target.value);
    setTempValueError(isEmpty(event.target.value));
  }

  return <TextField label={label} helperText={tempValueError ? "cannot be empty" : ""} value={editing ? tempValue : value} fullWidth disabled={!editing} error={tempValueError}
                    onChange={(event) => handleChange(setTempValue, setTempValueError, event)}/>
}

export default ConfigField;