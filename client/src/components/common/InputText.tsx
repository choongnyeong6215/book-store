import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import styled from "styled-components";

interface IInputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  inputType?: "text" | "email" | "password" | "number";
  placeholder: string;
}

const InputText = forwardRef(
  (
    { inputType, placeholder, onChange, ...props }: IInputTextProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        type={inputType}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
