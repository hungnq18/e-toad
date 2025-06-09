import PropTypes from 'prop-types';
import React from 'react';

const ImageCard = ({
  imageUrl,
  width = 240,
  height,
  className = '',
  onClick,
  buttonText = 'Tham gia',
  buttonStyle = {},
  buttonClassName = '',
  cardStyle = {}
}) => {
  return (
    <div
      style={{ 
        width: width,
        height: height || width,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '60px',
        ...cardStyle
      }}
      className={`${className} group cursor-pointer`}
    >
      <img 
        alt="card image"
        src={imageUrl}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 sm:opacity-0 sm:group-hover:opacity-50 transition-all duration-300 flex items-center justify-center">
        <button 
          style={buttonStyle}
          className={`relative z-10 opacity-100 transform translate-y-0 sm:opacity-0 sm:group-hover:opacity-100 bg-white text-black w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 sm:transform sm:translate-y-4 sm:group-hover:translate-y-0 font-bold text-lg shadow-xl border-2 border-black ${buttonClassName}`}
          onClick={onClick ? onClick : () => { window.location.href = '/lop-hoc-ao'; }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.object,
  buttonClassName: PropTypes.string,
  cardStyle: PropTypes.object
};

export default ImageCard;