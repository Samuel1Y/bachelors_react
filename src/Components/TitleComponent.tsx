import { Box, TextField } from "@mui/material";
import { TitleComponentProps } from "./Types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setLessonPlanTitle } from "../Redux/Reducers/lessonPlansSlice";
import { useAppDispatch } from "../Redux/hooks";

export const TitleComponent: React.FC<TitleComponentProps> = ({ sx, text }) => {

  const [titleInput, setTitleInput] = React.useState(text)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(setLessonPlanTitle(titleInput))
  },[titleInput, dispatch]);

   return (
    <TextField
      multiline
      maxRows={2}
      value={titleInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)}
      inputProps={{style: {
        fontSize: '3rem',
        lineHeight: '3rem',
        width:'auto',
        height:'auto',
        textAlign:'center',
      },maxLength:32}}
      sx={{
        color: 'black',
        textAlign:'center',
        height:'auto',
        width:'auto',
        maxHeight:'inherit',
        maxWidth:'inherit',
        overflow:'hidden',
        ...sx
      }}
    >
    </TextField>
)}

export default connect(null, { setLessonPlanTitle })(TitleComponent)