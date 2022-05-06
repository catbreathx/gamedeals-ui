import styled from '@emotion/styled';
import { LARGE } from 'common/layout/constants';

export const PageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 24px;
  width: 1100px;

  @media screen and (max-width: ${LARGE}) {
    padding: 2px;
    width: 100%;
  }

`;
