import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { BsFillHeartFill, BsFillChatSquareQuoteFill } from "react-icons/bs";
import styles from './styles.module.scss';

const IdeaCard = props => {
	const {imageUrl, title, description, like, comment, link} = props;
	return (
  <Link href={link}>
    <Card className={styles.card}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>
          {description}
        </Card.Text>
        <Row>
          <Col>
            <BsFillHeartFill className={styles.icon} />
            {like}
          </Col>
          <Col>
            <BsFillChatSquareQuoteFill className={styles.icon} />
            {comment}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Link>
	);
};

IdeaCard.defaultProps = {
	like: 0,
	comment: 0
};

IdeaCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	like: PropTypes.number,
	comment: PropTypes.number,
	link: PropTypes.string.isRequired,
};

export default IdeaCard;
