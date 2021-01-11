import React, { useRef, useEffect } from 'react';
import BubbleChat from 'components/BubbleChat';
import useChat from 'hooks/useChat';
import PropTypes from 'prop-types';
import InputChat from 'containers/ChatContainer/inputChat';
import firebase from 'libraries/FirebaseInitial';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { mutate } from 'swr';
import styles from './styles.module.scss';
import chatMap from '../../map/chatMap';

const ChatContainer = ({ user }) => {
  const divRef = useRef();
  let result = [];
  const limit = 10;
  const { data } = useChat({
    url: `/chats?limit=${limit}&offset=0`,
  });
  if (data && data.result) {
    result = [...result, ...data.result.map(chatMap)];
  }

  const getChat = async (chatId) => {
    const res = await MarkodingFetch(`/chats/${chatId}`);
    if (res && res.ok && res.result) {
      result = [...result, res.result];
      await mutate(`/chats?limit=${limit}&offset=0`, {
        ...data,
        result: [res.result],
      });
      if (divRef && divRef.current) {
        divRef.current.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const starCountRef = firebase.database().ref('chat');
    starCountRef.on('value', (snapshot) => {
      const snap = snapshot.val();
      if (snap && snap.id) {
        getChat(snap.id);
      }
    });
    if (divRef && divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      {user && (
        <>
          <div className={styles.chatWrap}>
            {result
              .slice(0)
              .reverse()
              .map((c) => (
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
          </div>
          <div ref={divRef} />
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
