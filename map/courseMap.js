import noImageSVG from 'svgs/no-image.svg';

export default function courseMap(data) {
  const desc = data.fullDescription.trim().substr(0, 35);
  return {
    id: data.id,
    title: data.title,
    description: data.shortDescription !== '' ? data.shortDescription : desc,
    imageUrl: data.imageUrl || noImageSVG,
    link: data.url,
  };
}
