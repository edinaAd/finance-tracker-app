import "./LoadingSpinner.scss";

// Check https://loading.io/css for the source of this spinner.
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