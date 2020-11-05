import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { BsFillHeartFill, BsFillChatQuoteFill } from "react-icons/bs";
import styles from './styles.module.scss';

const IdeaCard = props => {
	const {imageUrl, title, description, likeCount, commentCount, link} = props;
	return (
  <Link href={link}>
    <Card className="rounded shadow">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>
          {description}
        </Card.Text>
        <div className="d-flex justify-content-start">
          <div className="mr-5">
            <BsFillHeartFill className={styles.icon} />
            <span className="text-secondary">{likeCount}</span>
          </div>
          <div>
            <BsFillChatQuoteFill className={styles.icon} />
            <span className="text-secondary">{commentCount}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Link>
	);
};

IdeaCard.defaultProps = {
	likeCount: 0,
	commentCount: 0
};

IdeaCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	likeCount: PropTypes.number,
	commentCount: PropTypes.number,
	link: PropTypes.string.isRequired,
};

export default IdeaCard;
