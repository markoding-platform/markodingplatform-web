import { node, string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { panelCard, textTitle } from './styles.module.scss';

const Panel = ({ children, title }) => {
  return (
    <div className={panelCard}>
      <Card className="w-100 border-0">
        {title && <Card.Header className={`${textTitle}`}>{title}</Card.Header>}
        <div className="py-4">{children}</div>
      </Card>
    </div>
  );
};

Panel.defaultProps = {
  title: '',
};
Panel.propTypes = {
  children: node.isRequired,
  title: string,
};

export default Panel;
