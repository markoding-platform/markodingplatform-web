import React, { useEffect, useState } from 'react';
import BubbleChat from 'components/BubbleChat';
import PropTypes from 'prop-types';
import InputChat from 'containers/ChatContainer/inputChat';
import firebase from 'libraries/FirebaseInitial';
import MarkodingFetch from 'libraries/MarkodingFetch';
import Loading from 'components/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './styles.module.scss';
import chatMap from '../../map/chatMap';

const ChatContainer = ({ user }) => {
  const limit = 6;
  const [pagination, setPagination] = useState({
    page: 1,
    offset: 0,
  });
  const [chats, setChats] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [extraOffset, setExtraOffset] = useState(0);

  const getChats = async () => {
    const { offset } = pagination;
    const offsetPlusPlus = offset + extraOffset;
    const response = await MarkodingFetch(
      `/chats?limit=${limit}&offset=${offsetPlusPlus}`
    );
    if (response.ok) {
      const result = response?.result || {};
      const { data, pages = {} } = result;
      const newChats = data.map(chatMap);
      setChats((prevChats) => [...prevChats, ...newChats]);
      if (pages.currentPage === pages.totalPages) {
        setHasMore(false);
      }
    }
  };

  const nextGetting = async () => {
    await setPagination((prevPagination) => {
      const { page } = prevPagination;
      return {
        page: page + 1,
        offset: limit * (page + 1) - limit,
      };
    });
  };

  const getChat = async (chatId) => {
    const res = await MarkodingFetch(`/chats/${chatId}`);
    if (res && res.ok && res.result) {
      const newChat = chatMap(res.result);
      setChats((prevChats) => {
        const filteredChats = prevChats.filter((cx) => {
          return +cx.id === +res.result.id;
        });
        if (filteredChats.length < 1) {
          setExtraOffset((prevExtraOffset) => prevExtraOffset + 1);
          return [newChat, ...prevChats];
        }
        return [...prevChats];
      });
    }
  };

  useEffect(() => {
    getChats();
  }, [pagination]);

  useEffect(() => {
    const starCountRef = firebase.database().ref('chat');
    starCountRef.on('value', (snapshot) => {
      const snap = snapshot.val();
      if (snap && snap.id) {
        getChat(snap.id);
      }
    });
  }, []);

  return (
    <>
      {user && chats.length > 0 && (
        <>
          <div id="chatWrap" className={styles.chatWrap}>
            <InfiniteScroll
              dataLength={chats.length}
              next={nextGetting}
              inverse
              hasMore={hasMore}
              loader={<Loading withText={false} />}
              scrollableTarget="chatWrap"
              endMessage={<p className="text-danger">No more data</p>}
              className={styles.infiniteScroll}
            >
              {chats.map((c) => (
                <div key={c.id} className="mb-4">
                  <BubbleChat
                    payload={c.payload}
                    avatar={c.avatarUrl}
                    name={c.name}
                    time={c.time}
                    position={c.sender === user.id ? 'right' : 'left'}
                  />
                </div>
              ))}
            </InfiniteScroll>
          </div>
          <InputChat />
        </>
      )}
    </>
  );
};

ChatContainer.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default ChatContainer;
