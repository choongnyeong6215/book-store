import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { useAuthStore } from "../../store/authStore";
import { useAlert } from "../../hooks/useAlert";

const Header = () => {
  const { categories } = useCategories();
  const { isLogin, storeLogOut } = useAuthStore();
  const naivgate = useNavigate();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    storeLogOut();
    showAlert("로그아웃 완료되었습니다.");
    naivgate("/");
  };

  return (
    <HeaderStyle>
      <Link to="/">
        <h1 className="logo">
          <img src={logo} alt="book store logo" />
        </h1>
      </Link>
      <nav className="category">
        <ul>
          {categories.map((category) => (
            <li key={category.categoryId}>
              <Link
                to={
                  category.categoryId === null
                    ? `/books`
                    : `/books?categoryId=${category.categoryId}`
                }
              >
                {category.categoryName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        {/* 높이 간격 맞추기 */}
        {isLogin && (
          <ul>
            <li>
              <Link to={"/carts"}>장바구니</Link>
            </li>
            <li>
              <Link to={"/orderList"}>주문내역</Link>
            </li>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        )}
        {/* 높이 간격 맞추기 */}
        {!isLogin && (
          <ul>
            <li>
              <Link to={`/login`}>
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to={`/join`}>
                <FaRegUser />
                회원가입
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;

          &:hover {
            color: ${({ theme }) => theme.color.primary};
            cursor: pointer;
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          background-color: none;
          border: none;
          cursor: pointer;

          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
`;
