import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

import TableComponent from 'components/TableLeaderboards/Table';

import {
  styTabTitle,
  styTabContainer,
  styActiveTab,
  styNav,
} from './styles.module.scss';

const LeaderboardsContainer = () => {
  const [activeKey, setActiveKey] = useState('team');

  const list = [
    {
      id: '0',
      avatarUrl: '',
      name: 'Ariqah',
      points: 300,
      position: '1',
    },
    {
      id: '1',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '2',
    },
    {
      id: '2',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '3',
    },
  ];
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
              <Nav.Item
                className={`${
                  activeKey === 'team' && styActiveTab
                } w-50 pb-3 text-center`}
              >
                <Nav.Link eventKey="team" className={styTabTitle}>
                  Ranking Team
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                className={`${
                  activeKey === 'individual' && styActiveTab
                } pb-3 w-50 text-center`}
              >
                <Nav.Link eventKey="individual" className={styTabTitle}>
                  Ranking Perorangan
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Tab.Content className="pt-2">
          {activeKey === 'team' && (
            <Tab.Pane eventKey="team" className="w-100">
              <div className="bg-white">
                {list.map((item) => (
                  <TableComponent
                    key={item.id}
                    name={item.name}
                    points={item.points}
                    position={item.position}
                  />
                ))}
              </div>
            </Tab.Pane>
          )}
          {activeKey === 'individual' && (
            <Tab.Pane eventKey="individual" className="w-100">
              <div className="bg-white">
                {list.map((item) => (
                  <TableComponent
                    key={item.id}
                    name={item.name}
                    points={item.points}
                    position={item.position}
                  />
                ))}
              </div>
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default LeaderboardsContainer;
