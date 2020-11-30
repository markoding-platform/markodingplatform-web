const useErrorHandler = (error, info) => {
  const logError = () => {
    if (error) {
      console.error({ info });
      console.error({ error });
    }
  };
  return logError;
};

export default useErrorHandler;
