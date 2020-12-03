import PropTypes from 'prop-types';

const SsoSuccess = ({ sso, sig }) => {
  return (
    <div className="text-center">
      <p>{`SSO: ${sso}`}</p>
      <p>{`SIG: ${sig}`}</p>
    </div>
  );
};

SsoSuccess.propTypes = {
  sso: PropTypes.string.isRequired,
  sig: PropTypes.string.isRequired,
};

SsoSuccess.getInitialProps = async (ctx) => {
  const { sso, sig } = await ctx.query;
  return {
    sso,
    sig,
  };
};

export default SsoSuccess;
