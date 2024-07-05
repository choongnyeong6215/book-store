import { Location, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/common/Title";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { IDelivery, IOrderSheet } from "../models/orders.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { addOrder } from "../api/orders.api";
import { useAlert } from "../hooks/useAlert";

interface IDeliveryForm extends IDelivery {
  addressDetail: string;
}

const Order = () => {
  const { showAlert, showConfirm } = useAlert();
  const location: Location<Omit<IOrderSheet, "delivery">> = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state;
  const { representativeBookTitle, totalPrice, totalQuantity } =
    orderDataFromCart;

  console.log(orderDataFromCart);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDeliveryForm>();

  const handlePay = (data: IDeliveryForm) => {
    const orderData: IOrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    // 서버로 주문 데이터 전송
    // console.log(orderData);

    showConfirm("주문하시겠어요?", () => {
      addOrder(orderData).then(() => {
        showAlert("주문이 처리되었습니다.");
        navigate("/orderList");
      });
    });
  };

  const preventEnter = () => {
    return;
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <OrderStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery" onSubmit={handleSubmit(preventEnter)}>
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", {
                      required: "주소는 필수 항목입니다",
                    })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">{errors.address.message}</p>
              )}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail", {
                      required: "상세 주소는 필수 항목입니다",
                    })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">{errors.addressDetail.message}</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("receiver", {
                      required: "수령인은 필수 항목입니다",
                    })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">{errors.receiver.message}</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", {
                      required: "전화번호는 필수 항목입니다",
                    })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">{errors.contact.message}</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {representativeBookTitle} 등 총 {totalQuantity} 권
            </strong>
          </div>
        </div>

        <div className="summary">
          <CartSummary
            totalBooksQuantity={totalQuantity}
            totalPrice={totalPrice}
          />
          <Button
            size="medium"
            schema="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </OrderStyle>
    </>
  );
};

const OrderStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;

    h1 {
      padding: 0 0 24px 0;
    }
  }

  .delivery {
    fieldset {
      border: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;

        input {
          width: 100%;
        }
      }
    }
  }

  .error-text {
    color: red;
    padding: 0 0 12px 0;
    text-align: right;
  }
`;

export default Order;
