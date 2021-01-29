export default function trimText(text, len = null) {
  const strippedString = text.replace(/(<([^>]+)>)/gi, '');
  if (len) {
    return `${strippedString.slice(0, len)}...`;
  }
  return strippedString;
}
