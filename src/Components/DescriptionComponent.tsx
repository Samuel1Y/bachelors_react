import { TextField } from "@mui/material";
import { DescriptionComponentProps } from "./Types";
import React from "react";
import { connect } from "react-redux";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { useLocation } from "react-router";
import { updateComponent } from "../Redux/Reducers/LessonPlanListSlice";
import { UpdateComponentPayload } from "../Redux/payloadTypes";

 const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ sx, text, type, slot, pageNumber }) => {

  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const [descriptionInput, setDescriptionInput] = React.useState(text)
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
      maxRows={4}
      value={descriptionInput}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setDescriptionInput(e.target.value)
        handleUpdate(e.target.value)}}
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

export default connect(null, { updateComponent })(DescriptionComponent)