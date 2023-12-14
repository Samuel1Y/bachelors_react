import { TextField } from "@mui/material";
import { TitleComponentProps } from "./Types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { updateComponent } from "../Redux/Reducers/LessonPlanListSlice";
import { UpdateComponentPayload } from "../Redux/payloadTypes";
import { useLocation } from "react-router";

const TitleComponent: React.FC<TitleComponentProps> = ({ sx, text, type, slot, pageNumber }) => {

  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const [titleInput, setTitleInput] = React.useState(text)
  const currentLessonPlan = useAppSelector((state) => state.lessonPlan.currentLessonPlan)
  const currentLesson = currentLessonPlan?.lessons.find((lesson) => lesson.title === pathname.split('/')[2].replace('%20', ' '))

  const handleUpdate = (text: string) => {
    let payload: UpdateComponentPayload = {
      lessonPlanTitle: currentLessonPlan?.title || 'error',
      lessonTitle: currentLesson?.title || 'error',
      text: text,
      type: type,
      slot: slot || -1,
      pageNumber: pageNumber || -1
    }

    dispatch(updateComponent(payload))
  }

   return (
    
    <TextField
      multiline
      maxRows={2}
      value={titleInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.target.value)
        handleUpdate(e.target.value)}}
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


export default connect(null, { updateComponent })(TitleComponent)