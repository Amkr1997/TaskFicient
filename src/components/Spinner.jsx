const Spinner = () => {
  return (
    <>
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <h3 className="text-center">LOADING...</h3>
      </div>
    </>
  );
};

export default Spinner;
