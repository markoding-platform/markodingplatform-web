import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import styles from './styles.module.scss';

const CoursesCard = props => {
	const {imageUrl, title, description, link} = props;
	return (
  <Card className="rounded shadow">
    <Card.Img variant="top" src={imageUrl} />
    <Card.Body>
      <Card.Title className={styles.title}>{title}</Card.Title>
      <Card.Text className={styles.text}>
        {description}
      </Card.Text>
      <Link href={link}>
        <Button variant="primary" block>Daftar kelas</Button>
      </Link>
    </Card.Body>
  </Card>
	);
};

CoursesCard.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default CoursesCard;
