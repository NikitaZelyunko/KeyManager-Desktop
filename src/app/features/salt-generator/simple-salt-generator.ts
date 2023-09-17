export function createSimpleSaltGenerator() {
  return () => {
    const length = new Uint16Array(1);
    window.crypto.getRandomValues(length);
    const randomNumbers = new Uint8Array(length[0]);
    window.crypto.getRandomValues(randomNumbers);
    return randomNumbers.join('');
  };
}
