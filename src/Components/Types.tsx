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