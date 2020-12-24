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
  const [activeKey, setActiveKey] = useState('team');
  const teamRankDesc = `Papan peringkat team ini menunjukan Mpoin Sobat Markoding yang sudah menyelesaikan berbagai macam kelas, kuis, dan tantangan secara real time.`;
  const individualRankDesc = `Papan peringkat perorangan ini menunjukan Mpoin Sobat Markoding yang sudah menyelesaikan berbagai macam kelas, kuis, dan tantangan secara real time.`;
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
        <Tab.Content className="pt-5">
          <Tab.Pane eventKey="team" className="w-100">
            <DynamicTeamRank desc={teamRankDesc} />
          </Tab.Pane>
          <Tab.Pane eventKey="individual" className="w-100">
            <DynamicTeamRank desc={individualRankDesc} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default TabsLeaderboard;
