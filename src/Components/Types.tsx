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
    type: 'TitleComponent',
    text?: string,
    slot?: number
    pageNumber?: number 
    sx?: object,
  }

  export type DescriptionComponentProps = {
    type: 'DescriptionComponent',
    text?: string,
    slot?: number,
    pageNumber?: number ,
    sx?: object,
  }

  export type CodeBlockComponentProps = {
    type: 'CodeBlockComponent',
    codeBlockId?: number,
    slot?: number,
    pageNumber?: number,
    jsonBlocks?: string,
  }

  export type PageComponent = TitleComponentProps | DescriptionComponentProps | CodeBlockComponentProps

  export type PageComponentProps = {
    component: PageComponent
  }

  export type LessonPopUpProps = {
    lesson: Lesson,
    onOpen?: (() => void) | ((event: React.MouseEvent<HTMLElement>) => void),
    onClose?: (() => void) | ((event: React.MouseEvent<HTMLElement>) => void),
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
    components: Array<PageComponent>,
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
    titles: Array<Title>
    numberOfPages: number
  }


  //to delete
  export type LessonPage = {
    components: Array<PageComponent>,
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

  export type Title = {
    titleId: number
    slot: number
    pageNumber: number 
    text: string
  }

  export type Teacher = {
    username: string
    token: string 
  }
