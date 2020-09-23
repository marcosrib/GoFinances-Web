import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      ul li {
        display: inline;
        & + li {
          margin-left: 32px;
        }
      }

      ul li > .active {
        border-bottom: 2px solid #ff872c;
        opacity: 10;
      }

      ul li a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        padding-bottom: 10px;
        transition: opacity 0.2s;
        opacity: 0.8;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
`;
