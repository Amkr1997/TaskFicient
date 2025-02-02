const Spinner = () => {
  return (
    <>
      <div className="text-center" style={{ marginTop: "22vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <h3 className="text-center">LOADING...</h3>
      </div>
    </>
  );
};

export default Spinner;
