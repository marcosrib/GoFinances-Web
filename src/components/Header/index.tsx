import React from 'react';

import { Link, NavLink } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Listagem
            </NavLink>
          </li>
          <li>
            <NavLink to="/import" activeClassName="active">
              Importar
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </Container>
);

export default Header;
