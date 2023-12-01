import { TextField } from "@mui/material";
import { DescriptionComponentProps } from "./Types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLessonPlanTitle } from "../Redux/Reducers/lessonPlansSlice";
import { useAppDispatch } from "../Redux/hooks";

export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ sx, text }) => {

  const [descriptionInput, setDescriptionInput] = React.useState(text)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setLessonPlanTitle(''))
  },[dispatch]);

   return (
    <TextField
      multiline
      maxRows={4}
      value={descriptionInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescriptionInput(e.target.value)}
      inputProps={{style: {
        fontSize: '0.9rem',
        lineHeight: '1.2rem',
        width:'-webkit-fill-available',
        height:'6rem',
        textAlign:'justify',
      },maxLength:300}}
      sx={{
        color: 'black',
        textAlign:'center',
        height:'auto',
        width:'-webkit-fill-available',
        maxHeight:'inherit',
        maxWidth:'inherit',
        overflow:'hidden',
        ...sx
      }}
    >
    </TextField>
)}

export default connect(null, { setLessonPlanTitle })(DescriptionComponent)