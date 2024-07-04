import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from "styled-components";

interface ICheckIconButtonProps {
  isChecked: boolean;
  onCheck: () => void;
}

const CheckIconButton = ({ isChecked, onCheck }: ICheckIconButtonProps) => {
  return (
    <CheckIconButtonStyle onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </CheckIconButtonStyle>
  );
};

const CheckIconButtonStyle = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
