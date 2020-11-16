import ProfileCard from 'components/ProfileCard';
import Card from 'react-bootstrap/Card';
import { BsPlus, BsArrowRight } from 'react-icons/bs';
import {
  circleBorder,
  addTeamMateWrapper,
  textTitle,
  textArea,
  fieldTitle,
  btnIde,
} from './styles.module.scss';

const RegisterIdeaContainer = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          <ProfileCard />
        </div>

        <div className="w-50">
          <div className="my-5">
            <Card className={`${addTeamMateWrapper} border-0 py-4`}>
              <div className={circleBorder}>
                <BsPlus size={40} className="text-primary" />
              </div>
              <p className="py-4 text-center">Tambahkan team member</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <h1 className={textTitle}>Detail Ide</h1>
        <div className="my-4">
          <p className={fieldTitle}>Masalah</p>
          <textarea className={textArea} />
        </div>
        <div className="my-4">
          <p className={fieldTitle}>Solusi</p>
          <textarea className={textArea} />
        </div>
        <div className="d-flex justify-content-center">
          <button
            className={`btn btn-primary text-center ${btnIde}`}
            type="button"
          >
            <span className="pr-2">kirim Ide Solusi</span>
            <BsArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterIdeaContainer;
