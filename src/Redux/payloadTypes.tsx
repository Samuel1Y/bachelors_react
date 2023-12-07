import { CodeBlock, Description, Title } from "../Components/Types"

export type SaveLessonPagePayload = {
  lessonPlanTitle: string,
  lessonTitle: string,
  codeBlocks: Array<CodeBlock>
  descriptions: Array<Description>
  titles: Array<Title>
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