import { InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { POKEAPIGRAPHURL } from '../constants';

export function apolloFactory(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache(),
    link: httpLink.create({
      uri: POKEAPIGRAPHURL,
    }),
  };
}

export const apolloProvider = {
  provide: APOLLO_OPTIONS,
  useFactory: apolloFactory,
  deps: [HttpLink],
};
