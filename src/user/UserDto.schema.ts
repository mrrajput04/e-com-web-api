import * as Joi from '@hapi/joi';

export const UserDtoSchema = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-z0-9!@#$]{5,30}$'))
    .min(6)
    .max(30)
    .required(),
  confirm_password: Joi.ref('password'),
});
