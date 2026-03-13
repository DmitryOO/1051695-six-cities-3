import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
type PrivateRouteProps = {
  authorizationStatus: boolean;
  children: JSX.Element;
}

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === true ?
      children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
