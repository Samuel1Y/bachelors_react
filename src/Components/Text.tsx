import * as React from 'react'
import Typography from '@mui/material/Typography'
import { TextProps } from './Types'


export const Title: React.FC<TextProps> = ({ text, sx }) => (
  <Typography
    variant="h1"
    sx={{
      fontSize: '2rem',
      lineHeight: '2.7',
      color: 'black',
      ...sx
    }}
  >
    {text}
  </Typography>
)

export const Subtitle: React.FC<TextProps> = ({ text, sx }) => (
  <Typography
    variant="subtitle1"
    sx={{
        fontSize: '1.5rem',
        lineHeight: '2',
        color: 'black',
        ...sx
      }}
  >
    {text}
  </Typography>
)

export const DefaultText: React.FC<TextProps> = ({ text, sx }) => (
  <Typography
    variant="subtitle1"
    sx={{
        fontSize: '1rem',
        lineHeight: '1',
        color: 'black',
        ...sx
      }}
  >
    {text}
  </Typography>
)