import { CodeBlock, Description, PageComponent, Title } from "../Components/Types"

export type SaveLessonPagePayload = {
  lessonPlanTitle: string,
  lessonTitle: string,
  codeBlocks: Array<CodeBlock>,
  descriptions: Array<Description>,
  titles: Array<Title>,
  numberOfPages: number
}

export type GetLessonPayload = {
  lessonId: number,
    title: string,
    username: string,
    sharingCode: number,
    sharingTime: number,
    codeBlocks: Array<CodeBlock>,
    descriptions: Array<Description>,
    titles: Array<Title>,
    numberOfPages: number
}

export type AddComponentPayload = {
  lessonPlanTitle: string,
  lessonTitle: string,
  component: PageComponent
}

export type UpdateComponentPayload = {
  lessonPlanTitle: string,
  lessonTitle: string,
  type: string,
  text?: string,
  slot: number,
  pageNumber: number,
  jsonBlocks?: string 
}