import { useEffect } from "react";
import Button from "../common/Button";

interface IFindAddressButtonProps {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindAddressButton = ({ onCompleted }: IFindAddressButtonProps) => {
  // kakaomap script

  // handler

  // 입력

  const handleOpen = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button size="medium" schema="normal" onClick={handleOpen} type="button">
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
