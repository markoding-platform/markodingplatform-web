import ProfileCard from 'components/ProfileCard';
import Card from 'react-bootstrap/Card';
import { BsPlus } from 'react-icons/bs';
import {
  circleBorder,
  addTeamMateWrapper,
  teamMateText,
  teamWrapper,
} from './styles.module.scss';

const CreateTeam = () => {
  return (
    <div>
      <div className={teamWrapper}>
        <div>
          <ProfileCard
            title="Ketua Tim"
            primaryText="Amanda Simandjuntak"
            secondaryText="Siswa SMK"
          />
        </div>

        <div>
          <div className="my-4">
            <Card className={`${addTeamMateWrapper} border-0 py-4`}>
              <div className={circleBorder}>
                <BsPlus size={40} className="text-dark" />
              </div>
              <p className={teamMateText}>Tambah anggota baru</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
