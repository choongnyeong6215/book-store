import { ReactNode, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface IElipsisBox {
  children: ReactNode;
  limitLine: number;
}

const ElipsisBox = ({ children, limitLine }: IElipsisBox) => {
  const [expandedLine, settExpandedLine] = useState(true);

  return (
    <ElipsisBoxStyle $limitLine={limitLine} $expandedLine={expandedLine}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          schema="normal"
          onClick={() => settExpandedLine(!expandedLine)}
        >
          {expandedLine ? "접기" : "더 보기"}
          {expandedLine ? <FaAngleUp /> : <FaAngleDown />}
        </Button>
      </div>
    </ElipsisBoxStyle>
  );
};

interface IElipsisBoxStyleProps {
  $limitLine: number;
  $expandedLine: boolean;
}

const ElipsisBoxStyle = styled.div<IElipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ $limitLine, $expandedLine }) =>
      $expandedLine ? "none" : $limitLine};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    align-items: center;

    svg {
      background-color: transparent;
    }
  }
`;

export default ElipsisBox;
