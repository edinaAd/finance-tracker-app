import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className='lds'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;