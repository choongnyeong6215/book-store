import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CATEGORY = [
  {
    id: null,
    name: "전체",
  },
  {
    id: 0,
    name: "동화",
  },
  {
    id: 1,
    name: "소설",
  },
  {
    id: 2,
    name: "사회",
  },
];

const Header = () => {
  return (
    <HeaderStyle>
      <Link to="/">
        <h1 className="logo">
          <img src={logo} alt="book store logo" />
        </h1>
      </Link>
      <nav className="category">
        <ul>
          {CATEGORY.map((v) => (
            <li key={v.id}>
              <Link
                to={v.id === null ? `/books` : `/books?cLinktegory-id=${v.id}`}
              >
                {v.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
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
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;

          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
`;
