import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 60px;
  padding: 12px 32px;
  background: #FFF1E0;
  color: #FF8A00;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  z-index: 1;
  transition: color 0.3s ease;
//
  &::before {
    content: "";
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    background: #FFD8A9;
    transition: left 0.4s ease;
    z-index: 0;
  }

  &:hover::before {
    left: 0;
  }

  &:hover {
    color: #FF8A00; /* sửa lại lỗi 2 dấu ## */
  }

  span {
    position: relative;
    z-index: 2;
  }

  /* ✅ Responsive cho mobile */
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 24px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 20px;
  }
`;

const FancyButton = ({ children, onClick, className, style }) => {
  return (
    <StyledButton onClick={onClick} className={className} style={style}>
      <span>{children}</span>
    </StyledButton>
  );
};

export default FancyButton;
