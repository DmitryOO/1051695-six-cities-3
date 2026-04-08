import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { State } from '../../store';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';


type headerProps = {
  isSignedIn: string;
  favoriteOffersCount?: number;
  isLoginPage?: boolean;
}

function Header({ isSignedIn, isLoginPage = false, favoriteOffersCount }: headerProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector((state:State)=>state.user.email) || '';
  const userAvatarUrl = useAppSelector((state:State)=>state.user.avatarUrl) || '';
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </Link>
          </div>
          {isLoginPage ||
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {isSignedIn === AuthorizationStatus.Auth &&
                    <Link
                      to={AppRoute.Favorite}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={userAvatarUrl} style={{borderRadius: '50%'}}/>
                      </div>
                      <span className="header__user-name user__name">
                        {userEmail.charAt(0).toUpperCase() + userEmail.slice(1)}
                      </span>
                      <span className="header__favorite-count">{favoriteOffersCount}</span>
                    </Link>}
                  {isSignedIn !== AuthorizationStatus.Auth &&
                    < Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>}
                </li>
                {isSignedIn === AuthorizationStatus.Auth &&
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" >
                      <span className="header__signout" onClick={()=>void dispatch(logoutAction())} >Sign out</span>
                    </a>
                  </li>}
              </ul>
            </nav>}
        </div>
      </div>
    </header >
  );
}

export default Header;
