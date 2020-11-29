import dynamic from 'next/dynamic';
import EmptyPlaceholder from './EmptyPlaceholder';

const DynamicYoutubeIframe = dynamic(
  () =>
    import(
      /* webpackChunkName: "youtube-iframe-component" */ './YoutubeIframe'
    ),
  {
    loading: () => <EmptyPlaceholder />,
  }
);

export default DynamicYoutubeIframe;
