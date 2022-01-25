import React,{useRef, useEffect, useState} from 'react';
import { Container,Camera, Button,Video,
Result,
Canvas,
ButtonClose,

} from './styles';

export function CameraInit(){

    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const imageRef = useRef();

    const [hasPhoto, setHasPhoto] = useState(false);
    const [result, setResult] = useState("");

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({video:{width:1920, height: 1080}})
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }) .catch(err => {
            console.log(err);
        })
    }

    const takePhoto = () => {
        const width = 1024;
        const height = 768;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);


        photoRef.current.toBlob((blob) => {
            imageRef.current = blob;
        })


    }

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);

    }



useEffect(()=> {
    getVideo();
}, [videoRef])



    //verificação 
    async function handlePostImage(){
        takePhoto();
        if(imageRef.current){

            const formatData = new FormData();
            formatData.append('image', imageRef.current);
            // enviando a imagem via POST 
    
            const resp = await fetch('/classify' , {
                method: 'POST',
                body: formatData,
            });

            if(resp.status === 200) {
                const text = await resp.text();
                console.log(text);
            } else{
                console.log('Error na API');
            }
        }

    }

    return(
        <Container>
            <Camera>
                <Video ref={videoRef} />
                <Button
                    onClick={takePhoto}
                >Capturar imagem</Button>
            </Camera>

            <Result className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <Canvas
                    ref={photoRef}
                ></Canvas>
                <ButtonClose
                onClick={handlePostImage}
                >Enviar </ButtonClose>
            </Result>
            <div>{result}</div>
        </Container>

    );
}

