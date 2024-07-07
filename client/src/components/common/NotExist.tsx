import styled from "styled-components";
import Title from "@/components/common//Title";
import { ReactNode } from "react";

interface INotExistProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
}

const NotExist = ({ icon, title, description }: INotExistProps) => {
  return (
    <NotExistStyle>
      {icon && <div className="icon">{icon}</div>}
      <Title size="large" color="secondary">
        {title}
      </Title>
      {description && <p>{description}</p>}
    </NotExistStyle>
  );
};

const NotExistStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default NotExist;
