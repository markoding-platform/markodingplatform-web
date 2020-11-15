import { node, string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { panelWrapper, panelCard, textTitle } from './styles.module.scss';

const Panel = ({ children, title }) => {
  return (
    <div className={panelWrapper}>
      <Card className={panelCard}>
        {title && <Card.Header className={`${textTitle}`}>{title}</Card.Header>}
        <div className="p-4">{children}</div>
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
