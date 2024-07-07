import styled from "styled-components";
import { TButtonSchema, TButtonSize } from "@/style/theme";
import React, { ReactNode } from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: TButtonSize;
  schema: TButtonSchema;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  size,
  schema,
  disabled,
  isLoading,
  onClick,
  ...props
}: IButtonProps) => {
  return (
    <ButtonStyle
      size={size}
      schema={schema}
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<IButtonProps, "children">>`
  font-size: ${({ theme, size }) => theme.buttonSize[size].fontSize};
  padding: ${({ theme, size }) => theme.buttonSize[size].padding};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].color};
  background-color: ${({ theme, schema }) =>
    theme.buttonSchema[schema].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s, color 0.3s, opacity 0.3s;
`;

export default Button;
