export default function number(value) {
  const price = Math.round(value);
  return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
