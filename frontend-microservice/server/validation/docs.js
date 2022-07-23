import Joi from 'joi';
export default {
  
    // GET /:docId
    getDocument: {
      params: Joi.object({
        docId: Joi
                .number()
                .integer()
                .min(1)
                .required()
      })
    }
};