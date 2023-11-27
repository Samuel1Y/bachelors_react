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
    components: Array<LessonPage>
  }

  export type LessonPage = {
    components: Array<any>,
    sx?: object,
  }