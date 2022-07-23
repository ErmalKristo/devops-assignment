import { httpClient } from '../utils/httpClient.js';
import { logger } from "../utils/logs.js";
import * as validateDocs from "../utils/validateDocument.js";

async function get(req, res, next) {
    try {
        const docId = req.params.docId;
        const fileData = await httpClient.get(`/${docId}`, 
                            {responseType: 'arraybuffer'});

        const fileMeta = await validateDocs.getFileType(fileData.data);
        const fileName = `${docId}.${fileMeta.ext}`;
        logger.info(JSON.stringify(fileMeta));
        if (!validateDocs.isMimeSuported(fileMeta.mime)) {
            throw new Error('Got unsuported type of document: '+fileMeta.mime);
        }

        
        if(!await validateDocs.isValidFile(fileData.data)) {
            throw new Error('Got invalid file from backend!');
        }
        logger.error('Passed file validation');
        const downloadedDocument = Buffer.from(fileData.data, 'base64');
        res.writeHead(200, {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': fileMeta.mime,
        });
        
        res.end(downloadedDocument);

    } catch (err) {
        logger.error(err.message);
        res.status(500).send({ error: err.message });
    }
}

export default { get };