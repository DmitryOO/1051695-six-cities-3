import Header from '../../components/header/header';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { useState, ReactEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
type loginPageProps = {
  isSignedIn: string;
}

type changeHandlerType = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function LoginPage({ isSignedIn }: loginPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const handleEmailChange: changeHandlerType = (evt) => {
    setLoginData({ ...loginData, email: evt.currentTarget.value });
  };
  const handlePasswordChange: changeHandlerType = (evt) => {
    setLoginData({ ...loginData, password: evt.currentTarget.value });
  };
  const navigate = useNavigate();
  return (
    <div className="page page--gray page--login">
      <Header isSignedIn={isSignedIn} isLoginPage />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={async (e) => {
              e.preventDefault();
              await dispatch(loginAction(loginData)).unwrap();
              navigate(AppRoute.Main);
            }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  defaultValue={''}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  defaultValue={''}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit" >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;
