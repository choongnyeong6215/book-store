import styled from "styled-components";
import { useRouteError } from "react-router-dom";

interface IRouteError {
  status?: number;
  statusText?: string;
}

const Error = () => {
  const erros = useRouteError() as IRouteError;

  return (
    <ErrorStyle>
      <h1>오류가 발생했습니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>
        {erros.status} {erros.statusText}
      </p>
    </ErrorStyle>
  );
};

const ErrorStyle = styled.div``;

export default Error;
