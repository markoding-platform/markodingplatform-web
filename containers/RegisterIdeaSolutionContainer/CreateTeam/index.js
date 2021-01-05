import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { BsPlus } from 'react-icons/bs';

import ProfileCard from 'components/ProfileCard';
import ModalComponent from 'components/Modal';
import SearchMember from './SearchMember';

import {
  circleBorder,
  addTeamMateWrapper,
  teamMateText,
  teamWrapper,
} from './styles.module.scss';

const CreateTeam = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowModal((prevState) => !prevState);
  };
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
        <SearchMember />
      </ModalComponent>
    </div>
  );
};

export default CreateTeam;
