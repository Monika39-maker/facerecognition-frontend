import React from 'react';
import '../style.css';
import Tilt from 'react-parallax-tilt';


export default function Navigation() {
  return (
    <Tilt style={{width:'100px', height: '100px', marginLeft:'20px'}}>
      <div  style={{height:'100%', width:'100%'}} >
        <p className='logo'>FaceApp</p>
      </div>
      

    </Tilt>
    
  );
}