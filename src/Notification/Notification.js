import React, {useState} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Body from './Body.js';

const Notification = props => {
    const [image, setImage] = useState();
    return(
        <div>
            <container>
                <Header setImage={setImage} image={image}></Header>
                <Body></Body>
                <Footer></Footer>
            </container>
        </div>
    )
}

// class Notification extends React.Component{
//
//
//   render(){
//   return (
//     <div>
//     	<Header> image={image} </Header>
//     </div>
//   );
// }
// }

export default Notification;