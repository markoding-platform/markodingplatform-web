import { useState } from 'react';
import { shape, string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import { BsPlus } from 'react-icons/bs';

import { useGlobalFormContext } from 'components/context/FormContext';
import ProfileCard from 'components/ProfileCard';
import ModalComponent from 'components/Modal';
import SearchMember from './SearchMember';

import {
  circleBorder,
  addTeamMateWrapper,
  teamMateText,
  teamWrapper,
} from './styles.module.scss';

const CreateTeam = ({ user }) => {
  const userSchoolName = user.profile.schoolName;
  const [isShowModal, setIsShowModal] = useState(false);
  const {
    inputs: { teamIds = [] },
    setInputs,
  } = useGlobalFormContext();
  const [members, setMembers] = useState([]);

  const handleOpenModal = () => {
    setIsShowModal((prevState) => !prevState);
  };

  const handleSelectStudent = (student) => {
    setInputs({ teamIds: [...teamIds, student?.id] });
    const newMember = {
      id: student.id,
      name: student.name,
      school: student.profile.schoolName,
      status: 'Anggota',
    };
    setMembers([...members, ...[newMember]]);
    handleOpenModal();
  };

  const handleRemoveStudents = (id) => {
    const filterMember = members.filter((m) => m.id !== id);
    setMembers(filterMember);
    const newTeamIds = filterMember.map((item) => item.id);
    setInputs({ teamIds: newTeamIds });
  };

  return (
    <div>
      <div className={teamWrapper}>
        <div>
          <ProfileCard
            title="Ketua Tim"
            primaryText={user.name}
            secondaryText={userSchoolName}
          />
        </div>
        {members.map(({ name, school, status, id }) => (
          <ProfileCard
            key={id}
            title={status}
            primaryText={name}
            secondaryText={school}
            withRemoveBtn
            onClickRemove={() => handleRemoveStudents(id)}
          />
        ))}
        <div>
          <div className="my-4">
            <Card className={`${addTeamMateWrapper} border-0 py-4`}>
              <div
                className={circleBorder}
                aria-hidden="true"
                onClick={handleOpenModal}
              >
                <BsPlus size={40} className="text-dark" />
              </div>
              <p className={teamMateText}>Tambah anggota baru</p>
            </Card>
          </div>
        </div>
      </div>
      <ModalComponent
        show={isShowModal}
        onClose={handleOpenModal}
        title="Tambah Anggota Tim"
        subTitle="Cari berdasarkan nama atau alamat email"
      >
        <SearchMember onSelectStudent={handleSelectStudent} />
      </ModalComponent>
    </div>
  );
};

CreateTeam.propTypes = {
  user: shape({
    id: string,
    name: string,
    profile: shape({}),
  }).isRequired,
};
export default CreateTeam;
