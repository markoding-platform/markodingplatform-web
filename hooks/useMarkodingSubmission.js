const useMarkodingSubmission = () => {
  const isOpenSubmission = process.env.MARKODING_SUBMISSION === 'OPEN';
  return {
    isOpenSubmission,
  };
};

export default useMarkodingSubmission;
