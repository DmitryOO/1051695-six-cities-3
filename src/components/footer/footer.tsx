import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { memo } from 'react';

const FooterComponent = (): JSX.Element => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={AppRoute.Main}>
      <img
        className="footer__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={64}
        height={33}
      />
    </Link>
  </footer>
);

const Footer = memo(FooterComponent);

export default Footer;
