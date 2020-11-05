import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import styles from './styles.module.scss';

const BlogCard = props => {
	const {imageUrl, title, description, date, link} = props;
	return (
  <Link href={link}>
    <Card className="rounded shadow">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Text className={styles.text}>
          {description}
        </Card.Text>
        <Card.Text className={styles.date}>
          {date}
        </Card.Text>
      </Card.Body>
    </Card>
  </Link>
	);
};

BlogCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

export default BlogCard;
