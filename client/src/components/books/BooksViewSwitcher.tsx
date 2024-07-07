import styled from "styled-components";
import Button from "@/components/common/Button";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "@/constants/queryString";
import { useEffect } from "react";

const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  {
    value: "grid",
    icon: <FaTh />,
  },
];

export type TViewMode = "grid" | "list";

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParmas] = useSearchParams();

  const hanldeSwitchView = (value: TViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);

    setSearchParmas(newSearchParams);
  };

  // 초기 view 옵션
  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      hanldeSwitchView("grid");
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          size="medium"
          schema={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          key={option.value}
          onClick={() => hanldeSwitchView(option.value as TViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
};

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: white;
    background-color: transparent;
  }
`;

export default BooksViewSwitcher;
