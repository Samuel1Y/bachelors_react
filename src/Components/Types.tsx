//props------------------------

export type HeaderProps = {
}

export type ButtonProps = {
    label: string;
    sx?: object;
    onClick?: (() => void) | ((event: React.MouseEvent<HTMLElement>) => void);
    disabled?: boolean;
  }

  export type TextProps = {
    text: string | undefined,
    sx?: object,
  }

  export type TitleComponentProps = {
    text?: string,
    sx?: object,
  }

  export type LessonPlanProps = {
    title?: string,
    sx?: object,
  }

  export type LessonProps = {
    title?: string,
    sx?: object,
  }

  export type LessonPageComponentProps = {
    components: Array<any>,
    sx?: object,
  }
//objects------------------------

  export type LessonPlan = {
    title: string
    lessons: Array<Lesson>
  }

  export type Lesson = {
    title: string
    username: string
    sharingTime: number //sharing time in minutes
    codeBlocks: Array<CodeBlock>
    descriptions: Array<Description>
    numberOfPages: number
  }

  //to delete
  export type LessonPage = {
    components: Array<any>,
    sx?: object,
  }

  export type CodeBlock = {
    codeBlockId: number
    slot: number
    pageNumber: number 
    jsonBlocks: string
  }

  export type Description = {
    descriptionId: number
    slot: number
    pageNumber: number 
    text: string
  }