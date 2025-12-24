import { useState } from "react";
import img_1 from "../../assests/images/generic-hotel.jpeg";
import img_2 from "../../assests/images/hotel-reception.jpeg";
import img_3 from "../../assests/images/photos-1760163776699-63938264.jpeg";
import img_4 from "../../assests/images/photos-1760163776699-639382647.jpeg";
import img_5 from "../../assests/images/photos-1760163776730-278515460.jpeg";
import img_6 from "../../assests/images/photos-1760170723444-389649513.jpeg";
import img_7 from "../../assests/images/photos-1760170723472-524058864.jpeg";
import img_8 from "../../assests/images/photos-1760171248053-620758710.jpeg";
import img_9 from "../../assests/images/photos-1763149427824-292197216.jpeg";
import img_10 from "../../assests/images/photos-1763149825644-238766457.jpeg";
import img_11 from "../../assests/images/photos-1763149825645-866600345.jpeg";
import img_12 from "../../assests/images/photos-1763150636169-563917093.jpeg";


let imageFiles: any;
(async () => {
    imageFiles = await import.meta.glob('../../assets/images/*.jpeg');
    console.log(imageFiles);
})()


// const Image = ({ src, defaultSrc, alt, style, ...props }: { src: any, defaultSrc: any, alt: any, style?: any, props?: any }) => {
const Image = ({ src = '', alt = '', ...props }) => {

    const [imageSrc, setImageSrc] = useState<string>(src);
    // const [randomImage, setRandomImage] = useState(null);
    const handleImageError = () => {
        const imageArray: Array<any> = [
            img_1,
            img_2,
            img_3,
            img_4,
            img_5,
            img_6,
            img_7,
            img_8,
            img_9,
            img_10,
            img_11,
            img_12
        ];
        const randomIndex = Math.floor(Math.random() * imageArray.length);
        console.log((imageArray[randomIndex]));
        // setRandomImage(imageArray[randomIndex]);
        setImageSrc(imageArray[randomIndex]);
    }

    return (<img
        src={imageSrc}
        alt={alt}
        crossOrigin=""
        onError={handleImageError}
        {...props}
    />)
}

export default Image;