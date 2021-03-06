import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as queryString from 'query-string';

export const gameDealApi = createApi({
  reducerPath: 'gameDealApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.cheapshark.com/api/1.0/' }),
  endpoints: (build) => ({
    getStores: build.query({
      query: () => 'stores',
    }),
    getDeals: build.query({
      query: ({
        pageNumber,
        pageSize,
        storeId,
        gameTitle,
        exactGameTitle,
        onSale,
      }) => {
        const query = {
          pageNumber,
          pageSize,
          storeId,
          gameTitle,
          exactGameTitle,
          onSale,
        };
        const normalizedQuery = normalizeQueryParameters(query);
        const params = queryString.stringify(normalizedQuery);

        const queryParameters = `deals?${params}`;
        return queryParameters;
      },
      transformResponse: (response, meta) => {
        const totalPages = parseInt(meta.response.headers.get('x-total-page-count'), 10);
        const transformedResponse = {
          results: response,
          rows: response.length,
          totalPages,
        };
        return transformedResponse;
      },
    }),
  }),
});

const normalizeQueryParameters = ({
  pageNumber,
  pageSize,
  storeId,
  exactGameTitle,
  gameTitle,
  onSale,
}) => {
  let normalizedPageNumber = pageNumber;
  let normalizedExactTitle;
  let normalizedOnSale;

  if (gameTitle?.length) {
    normalizedPageNumber = undefined;
    normalizedExactTitle = exactGameTitle ? 1 : 0;
  }

  if (onSale) {
    normalizedOnSale = '1';
  }

  const normalizedQueryParameters = {
    exact: normalizedExactTitle,
    onSale: normalizedOnSale,
    pageNumber: normalizedPageNumber,
    pageSize,
    storeID: storeId,
    title: gameTitle,
  };
  return normalizedQueryParameters;
};

export const {
  useGetStoresQuery,
  useGetDealsQuery,
} = gameDealApi;
