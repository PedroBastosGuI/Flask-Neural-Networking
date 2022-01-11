// arquivos de configuração do opencv
interface Propsopen{
    cvFilePath: string;
    url:string;
}



import cv from "@techstark/opencv-js";


export async function LoadDatafile({
    cvFilePath,
    url
}:Propsopen) {

    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const data  = new Uint8Array(buffer);

    cv.FS_createDataFile("/", cvFilePath, data, true, false, false);
}