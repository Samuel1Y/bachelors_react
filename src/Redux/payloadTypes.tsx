import { CodeBlock, Description, Title } from "../Components/Types"

export type SaveLessonPagePayload = {
  lessonPlanTitle: string,
  lessonTitle: string,
  codeBlocks: Array<CodeBlock>
  descriptions: Array<Description>
  titles: Array<Title>
}