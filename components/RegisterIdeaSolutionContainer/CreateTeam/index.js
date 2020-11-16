import ProfileCard from 'components/ProfileCard';
import Card from 'react-bootstrap/Card';
import { BsPlus } from 'react-icons/bs';
import {
  circleBorder,
  addTeamMateWrapper,
  teamMateText,
} from './styles.module.scss';

const CreateTeam = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <ProfileCard
            title="ketua Tim"
            primaryText="Amanda Simandjuntak"
            secondaryText="Siswa SMK"
          />
        </div>

        <div className="w-50">
          <div className="my-5">
            <Card className={`${addTeamMateWrapper} border-0 py-4`}>
              <div className={circleBorder}>
                <BsPlus size={40} className="text-dark" />
              </div>
              <p className={teamMateText}>Tambahkan team member</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
