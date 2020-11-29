import { shape } from 'prop-types';

const ErrorFallback = ({ error }) => (
  // TODO: create better error handler UI
  <div>
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

ErrorFallback.propTypes = {
  error: shape({ message: '' }).isRequired,
};

export default ErrorFallback;
