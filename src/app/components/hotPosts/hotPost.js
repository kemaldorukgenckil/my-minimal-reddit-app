import React, { useEffect } from 'react'

export default function HotPost(props) {
   
     const { key, post } = props
     
    
     
     console.log(`post ${post.title}`);
  
  return (
    <div >
          <h2>{post.title}</h2>
           
    </div>
    
  );
}
