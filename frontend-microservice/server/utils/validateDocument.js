import {fileTypeFromBuffer} from 'file-type';
import pdfjs from "pdfjs-dist";
import { PNG } from "pngjs";
import { logger } from "./logs.js";

const getFileType = async (bufferFile) => {
    return await fileTypeFromBuffer(bufferFile);
}

const isMimeSuported = (mime) => {
    const supportedMimes = ['image/png', 'application/pdf'];
    return supportedMimes.includes(mime);
}

const isValidFile = async (bufferFile) => {
    let fileIsValid = false;
    try {
        const fileMeta = await getFileType(bufferFile);
        switch (fileMeta.mime) {
            case "image/png":
                fileIsValid = await isValidPNG(bufferFile);
                break;
            case "application/pdf":
                fileIsValid = await isValidPdf(bufferFile);
                break;
        }
        
        return fileIsValid;   
    } catch (e) {
        logger.error(e.message);
        return fileIsValid;
    }
    
}

const isValidPdf = async (bufferFile) => {
    try {
        const pdfDoc = await pdfjs.getDocument(bufferFile).promise;
        if (pdfDoc.stats === undefined || pdfDoc.numPages < 1) {
            return false;
        }
        return true;
    } catch (e) {
        logger.error(e.message);
        return false;  
    }

}

const isValidPNG = async (bufferFile) => {
    try {    
        const pngFile = PNG.sync.read(bufferFile);
        if (isNaN(pngFile.height) || isNaN(pngFile.width)) {
        return false;
        }
        return true;
    } catch (e) {
        logger.error(e.message);
        return false;  
    }

}

export {getFileType, isMimeSuported, isValidFile}