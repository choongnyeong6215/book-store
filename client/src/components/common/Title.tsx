import { ReactNode } from "react";
import styled from "styled-components";
import { TColorKey, THeadingSize } from "../../style/theme";

interface ITitleProps {
  children: ReactNode;
  size: THeadingSize;
  color?: TColorKey;
}

const Title = ({ children, size, color }: ITitleProps) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h1<Omit<ITitleProps, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;

export default Title;
