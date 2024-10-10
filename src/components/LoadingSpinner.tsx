const LoadingSpinner = ({ color = 'currentColor', size = 80 }) => {
  const spinnerStyle = {
    display: 'inline-block',
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
  };

  const dotStyle = (left) => ({
    position: 'absolute',
    top: `${size * 5/12}px`,
    width: `${size * 1/6}px`,
    height: `${size * 1/6}px`,
    borderRadius: '50%',
    background: color,
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
    left: `${left}px`,
  });

  return (
    <div style={spinnerStyle}>
      <div style={{...dotStyle(size * 1/10), animation: 'lds-ellipsis1 0.6s infinite'}} />
      <div style={{...dotStyle(size * 1/10), animation: 'lds-ellipsis2 0.6s infinite'}} />
      <div style={{...dotStyle(size * 4/10), animation: 'lds-ellipsis2 0.6s infinite'}} />
      <div style={{...dotStyle(size * 7/10), animation: 'lds-ellipsis3 0.6s infinite'}} />
      <style>{`
        @keyframes lds-ellipsis1 {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes lds-ellipsis3 {
          0% { transform: scale(1); }
          100% { transform: scale(0); }
        }
        @keyframes lds-ellipsis2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(${size * 3/10}px, 0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;