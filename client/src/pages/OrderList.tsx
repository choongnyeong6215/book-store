import styled from "styled-components";
import Title from "../components/common/Title";
import { useOrders } from "../hooks/useOrders";
import { formatDate, formatNumber } from "../utils/format";
import Button from "../components/common/Button";
import React from "react";

const OrderList = () => {
  const { orders, selectedOrderedItemId, selectOrderedItem } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt, "YYYY.MM.DD")}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.totalQuantity}</td>
                  <td>{formatNumber(order.totalPrice)} 원</td>
                  <td>
                    <Button
                      size="small"
                      schema="normal"
                      onClick={() => selectOrderedItem(order.id)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedOrderedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order.detail &&
                          order.detail?.map((item) => (
                            <li key={item.id}>
                              <div>
                                <span>{item.id}</span>
                                <span>{item.author}</span>
                                <span>{formatNumber(item.price)} 원</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;

      li {
        text-align: left;

        div {
          display: flex;
          padding: 8px 10px;
          gap: 8px;
        }
      }
    }
  }
`;

export default OrderList;
