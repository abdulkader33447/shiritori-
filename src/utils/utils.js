export function alphaTail(word) {
  const match = word.toLowerCase().match(/[a-z](?=[^a-z]*$)/);
  return match ? match[0] : null;
}

export function alphaHead(word) {
  const match = word.toLowerCase().match(/[a-z]/);
  return match ? match[0] : null;
}
