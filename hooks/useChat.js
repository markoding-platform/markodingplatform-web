import useSWR from 'swr';
import MarkodingFetch from 'libraries/MarkodingFetch';

const useChat = ({ url }) => {
  return useSWR(url, MarkodingFetch, {
    revalidateOnFocus: false,
  });
};

export default useChat;
