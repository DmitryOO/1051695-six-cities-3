import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { AuthorizationStatus } from '../../consts';
type PrivateRouteProps = {
  authorizationStatus: string;
  children: JSX.Element;
  isLoginPage?: boolean;
}

function PrivateRoute({ authorizationStatus, children, isLoginPage = false }: PrivateRouteProps) {
  const status = isLoginPage ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth;
  const route = isLoginPage ? AppRoute.Main : AppRoute.Login;

  return (
    authorizationStatus === status ?
      children :
      <Navigate to={route} />
  );
}

export default PrivateRoute;
