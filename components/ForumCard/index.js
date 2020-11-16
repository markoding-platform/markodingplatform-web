import PropTypes from 'prop-types';
import Media from 'react-bootstrap/Media';
import { BsFillHeartFill } from "react-icons/bs";
import { IoMdChatbubbles } from "react-icons/io";
import styles from './styles.module.scss';

const ForumCard = props => {
	const {imageUrl, name, comment, likeCount, commentCount, time} = props;
	return (
  <div className="shadow rounded">
    <Media className="p-3">
      <img
        width={52}
        height={52}
        className="mr-3 rounded"
        src={imageUrl}
        alt={name}
      />
      <Media.Body>
        <h5>{name}</h5>
        <p className={styles.time}>{time}</p>
        <p className={styles.text}>{comment}</p>
      </Media.Body>
    </Media>
    <div className="d-flex justify-content-start border-top p-3">
      <div className="mr-5">
        <BsFillHeartFill className={styles.iconLike} />
        {likeCount}
        {' '}
        Likes
      </div>
      <div>
        <IoMdChatbubbles className={styles.iconComment} />
        {commentCount}
        {' '}
        Comments
      </div>
    </div>
  </div>
	);
};

ForumCard.defaultProps = {
	likeCount: 0,
	commentCount: 0,
	link: '/'
};

ForumCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	comment: PropTypes.string.isRequired,
	likeCount: PropTypes.number,
	commentCount: PropTypes.number,
	time: PropTypes.string.isRequired,
	link: PropTypes.string,
};

export default ForumCard;
