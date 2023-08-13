import { latinLowerCaseAlphabet } from '../alphabets/latin-lower-case-alphabet';
import { latinUpperCaseAlphabet } from '../alphabets/latin-upper-case-alphabet';
import { numbersAlphabet } from '../alphabets/numbers-alphabet';
import { specialCharactersAlphabet } from '../alphabets/special-character-alphabet';

const simplePasswordParts = [
  latinLowerCaseAlphabet,
  latinUpperCaseAlphabet,
  numbersAlphabet,
  specialCharactersAlphabet,
];
export const simplePasswordAlphabet = {
  parts: simplePasswordParts,
  alphabet: simplePasswordParts.flat(),
};
