
function Tour360() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '120px' }}>
      <iframe
       loading="lazy"
        width="960"
        height="480"
        src="https://www.thinglink.com/view/scene/1989244403985679204"
        title="360 Virtual Tour"
        style={{ border: 'none' }}
        allowFullScreen
        scrolling="no"
      ></iframe>
      <iframe
       loading="lazy"
        width="960"
        height="480"
        src="https://www.thinglink.com/view/scene/1987605511326925286"
        title="360 Virtual Tour"
        style={{ border: 'none' }}
        allowFullScreen
        scrolling="no"
      ></iframe>
      
    </div>
  );
}

export default Tour360;
