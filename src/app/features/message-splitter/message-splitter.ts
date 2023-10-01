export function createMessageSplitter(splitLength: number) {
  return (message: Uint8Array) => {
    const result: Uint8Array[] = [];
    for (let i = 0; i < message.length; i += splitLength) {
      result.push(message.slice(i, i + splitLength));
    }
    return result;
  };
}
