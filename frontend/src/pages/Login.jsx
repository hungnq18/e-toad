import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import authApi from '../api/authApi'; // Import your authApi
import { useAuth } from '../contexts/AuthContext';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '18px', height: '18px', color: '#555' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '18px', height: '18px', color: '#555' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
);

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [signIn, toggle] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // Use the login method from useAuth context
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.message || 'Email hoặc mật khẩu không đúng.');
            }
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);
        try {
            const userData = {
                username: formData.username,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            };
            await authApi.register(userData);
            
            // On successful registration, switch to the sign-in view
            toggle(true); 
            
            // Clear form for security
            setFormData({
                username: '',
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <SignUpContainer signingIn={signIn}>
                <Form onSubmit={handleSignUp}>
                    <Title>Tạo tài khoản</Title>
                    {error && !signIn && <ErrorMessage>{error}</ErrorMessage>}
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input 
                        type="text" 
                        placeholder="Họ và tên" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputWrapper>
                        <Input
                            type={showSignUpPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <EyeIconButton type="button" onClick={() => setShowSignUpPassword(!showSignUpPassword)}>
                            {showSignUpPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </EyeIconButton>
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <EyeIconButton type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </EyeIconButton>
                    </InputWrapper>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </Button>
                     <MobileToggle>
                        Đã có tài khoản? <span onClick={() => { toggle(true); setError(''); }}>Đăng nhập</span>
                    </MobileToggle>
                </Form>
            </SignUpContainer>

            <SignInContainer signingIn={signIn}>
                <Form onSubmit={handleLogin}>
                    <Title>Đăng nhập</Title>
                    {error && signIn && <ErrorMessage>{error}</ErrorMessage>}
                    <Input 
                        type="email" 
                        placeholder="Email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputWrapper>
                        <Input
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <EyeIconButton type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                            {showLoginPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </EyeIconButton>
                    </InputWrapper>
                    <Anchor href="/forgot-password">Quên mật khẩu?</Anchor>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </Button>
                    <MobileToggle>
                        Chưa có tài khoản? <span onClick={() => { toggle(false); setError(''); }}>Đăng ký</span>
                    </MobileToggle>
                </Form>
            </SignInContainer>

            <OverlayContainer signingIn={signIn}>
                <Overlay signingIn={signIn}>
                    <LeftOverlayPanel signingIn={signIn}>
                        <Title>Chào mừng trở lại!</Title>
                        <Paragraph>
                            Để kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
                        </Paragraph>
                        <GhostButton onClick={() => toggle(true)}>Đăng nhập</GhostButton>
                    </LeftOverlayPanel>

                    <RightOverlayPanel signingIn={signIn}>
                        <Title>Xin chào!</Title>
                        <Paragraph>
                            Nhập thông tin cá nhân và bắt đầu hành trình với chúng tôi
                        </Paragraph>
                        <GhostButton onClick={() => toggle(false)}>Đăng ký</GhostButton>
                    </RightOverlayPanel>
                </Overlay>
            </OverlayContainer>
        </Container>
    );
};

export default Login;

// ==== Styled Components ====

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  margin: 50px auto;

  @media (max-width: 768px) {
    box-shadow: none;
    border-radius: 0;
    width: 100%;
    min-height: 100vh;
    margin: 0;
  }
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  `}

  @media (max-width: 768px) {
    width: 100%;
    opacity: 1;
    transform: none;
    z-index: 1;
    display: ${({ signingIn }) => (signingIn ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
  }
`;

const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(100%);
  `}
  
  @media (max-width: 768px) {
    width: 100%;
    transform: none;
    z-index: 2;
    display: ${({ signingIn }) => (signingIn ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
  }
`;

const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 25px;
    height: auto;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  margin-bottom: 20px;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box; 
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgb(249, 115, 22);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 8px 0;
  
  ${Input} {
    margin: 0;
    padding-right: 40px; 
  }
`;

const EyeIconButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid rgb(249, 115, 22);
  background-color: rgb(249, 115, 22);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  margin-top: 10px;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  &:hover {
    color: rgb(249, 115, 22);
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(-100%);
  `}

  @media (max-width: 768px) {
    display: none;
  }
`;

const Overlay = styled.div`
  background: linear-gradient(to right, rgb(249, 115, 22), rgb(255, 121, 63));
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(50%);
  `}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(0);
  `}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${({ signingIn }) => signingIn !== true && `
    transform: translateX(20%);
  `}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const ErrorMessage = styled.div`
  color: #c0392b;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const MobileToggle = styled.div`
  display: none;
  margin-top: 25px;
  font-size: 14px;

  span {
    color: rgb(249, 115, 22);
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
