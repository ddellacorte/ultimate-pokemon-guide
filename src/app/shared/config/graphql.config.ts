import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { POKEAPIGRAPHURL } from '../utils/constants';

export function apolloFactory(httpLink: HttpLink): ApolloClient.Options {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: POKEAPIGRAPHURL,
    }),
  };
}
