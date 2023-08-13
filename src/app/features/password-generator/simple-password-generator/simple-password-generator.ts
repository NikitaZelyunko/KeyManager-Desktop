import { simplePasswordAlphabet } from './simple-password-alphabet';

function generateRandomCharacterIndex(alphabet: string[]) {
  return Math.floor(Math.random() * alphabet.length);
}

export function simplePasswordGenerator(
  passwordLength: number = 20,
  passwordAlphabet = simplePasswordAlphabet
) {
  if (passwordLength <= 0) {
    return '';
  }

  const passwordAlphabetParts = passwordAlphabet.parts;
  const passwordAlphabetPartsLength = passwordAlphabetParts.length;

  if (passwordAlphabetPartsLength > passwordLength) {
    console.error('Password length less than alphabet classes. Correct password');
    return '';
  }

  const characterIndexes: number[] = [];
  const alphabet = passwordAlphabet.alphabet;

  const firstFillingPasswordCharactersCount = passwordLength - passwordAlphabetPartsLength + 1;

  // Generate first part of password
  for (let i = 0; i < firstFillingPasswordCharactersCount; i++) {
    characterIndexes.push(generateRandomCharacterIndex(alphabet));
  }

  // Check all alphabet parts exists in password and add element from that
  let startIndex = 0;
  passwordAlphabetParts.forEach((alphabetPart) => {
    const endIndex = startIndex + alphabetPart.length;
    const passwordHasPartCharacter = characterIndexes.some(
      (characterIndex) => characterIndex >= startIndex && characterIndex < endIndex
    );
    if (!passwordHasPartCharacter) {
      characterIndexes.push(startIndex + generateRandomCharacterIndex(alphabetPart));
    }
    startIndex = endIndex;
  });

  // End filling password
  const emptyCharactersCount = passwordLength - characterIndexes.length;
  for (let i = 0; i < emptyCharactersCount; i++) {
    characterIndexes.push(generateRandomCharacterIndex(alphabet));
  }

  // Get characters by index and add it to result password
  const result = characterIndexes.reduce((acc, characterIndex) => {
    return acc + alphabet[characterIndex] ?? alphabet[alphabet.length - 1];
  }, '');

  return result;
}
