import { Generation } from '../models/generation.model';
import { LanguageFlag } from '../models/language.model';
import { ColorType } from '../models/type';
import { LanguageFlag } from '../models/language.model';

export const POKEAPIURL = 'https://pokeapi.co/api/v2/';
export const POKEAPIGRAPHURL = `https://graphql.pokeapi.co/v1beta2`;
export const GENERATIONS: Generation[] = [
  {
    name: 'First',
    symbol: 'i',
  },
  {
    name: 'Second',
    symbol: 'ii',
  },
  {
    name: 'Third',
    symbol: 'iii',
  },
  {
    name: 'Fourth',
    symbol: 'iv',
  },
  {
    name: 'Fifth',
    symbol: 'v',
  },
  {
    name: 'Sixth',
    symbol: 'vi',
  },
  {
    name: 'Seventh',
    symbol: 'vii',
  },
  {
    name: 'Eighth',
    symbol: 'viii',
  },
  {
    name: 'Ninth',
    symbol: 'ix',
  },
];
export const TYPES: ColorType[] = [
  { name: 'normal', color: '#A8A77A' },
  { name: 'fire', color: '#EE8130' },
  { name: 'water', color: '#6390F0' },
  { name: 'electric', color: '#F7D02C' },
  { name: 'grass', color: '#7AC74C' },
  { name: 'ice', color: '#96D9D6' },
  { name: 'fighting', color: '#C22E28' },
  { name: 'poison', color: '#A33EA1' },
  { name: 'ground', color: '#E2BF65' },
  { name: 'flying', color: '#A98FF3' },
  { name: 'psychic', color: '#F95587' },
  { name: 'bug', color: '#A6B91A' },
  { name: 'rock', color: '#B6A136' },
  { name: 'ghost', color: '#735797' },
  { name: 'dragon', color: '#6F35FC' },
  { name: 'dark', color: '#705746' },
  { name: 'steel', color: '#B7B7CE' },
  { name: 'fairy', color: '#D685AD' },
];
export const LANGUAGES: LanguageFlag[] = [
  { id: 1,  name: 'ja-Hrkt', flags: ['jp'] },
  { id: 2,  name: 'roomaji', flags: ['jp'] },
  { id: 3,  name: 'ko', flags: ['kr'] },
  { id: 4,  name: 'zh-Hant', flags: ['tw', 'hk'] },
  { id: 5,  name: 'fr', flags: ['fr'] },
  { id: 6,  name: 'de', flags: ['de'] },
  { id: 7,  name: 'es', flags: ['es', 'mx', 'ar'] },
  { id: 8,  name: 'it', flags: ['it'] },
  { id: 9,  name: 'en', flags: ['gb', 'us'] },
  { id: 10, name: 'cs', flags: ['cz'] },
  { id: 11, name: 'ja', flags: ['jp'] },
  { id: 12, name: 'zh-Hans', flags: ['cn'] },
  { id: 13, name: 'pt-BR', flags: ['pt', 'br'] },
];