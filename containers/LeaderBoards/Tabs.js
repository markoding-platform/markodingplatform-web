import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import {
  styTabTitle,
  styTabContainer,
  styActiveTab,
  styNav,
} from './styles.module.scss';
import DynamicTeamRank from './TeamRank';

const TabsLeaderboard = () => {
  const [activeKey, setActiveKey] = useState('first');
  return (
    <div className={styTabContainer}>
      <Tab.Container
        id="controlled-tab-example"
        activeKey={activeKey}
        onSelect={(k) => setActiveKey(k)}
      >
        <Row>
          <Col>
            <Nav className={styNav}>
              <Nav.Item className="w-50 pb-3 text-center">
                <Nav.Link eventKey="first" className={styTabTitle}>
                  Tab 1
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={`${styActiveTab} pb-3 w-50 text-center`}>
                <Nav.Link eventKey="second" className={styTabTitle}>
                  Tab 2
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Tab.Content className="pt-5">
          <Tab.Pane eventKey="first" className="w-100">
            <DynamicTeamRank />
          </Tab.Pane>
          <Tab.Pane eventKey="second" className="w-100">
            <div>second</div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default TabsLeaderboard;
