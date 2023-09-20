import { ReactNode } from 'react'

export interface StyledBoxProps {
  display?: string;
  justifyContent?: string;
  alignItems?: string;
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
  flexDirection?:string;
  pt?: string;
  pl?: string;
  pb?: string;
  pr?: string;
} 

export interface BoxProps extends StyledBoxProps {
  children: ReactNode
}

export interface StyledTextProps {
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  height?: string;
  width?: string;
  margin?: string;
  padding?: string;
  pt?: string;
  pl?: string;
  pb?: string;
  pr?: string;
}

export interface TextProps extends StyledTextProps {
  children: ReactNode
}