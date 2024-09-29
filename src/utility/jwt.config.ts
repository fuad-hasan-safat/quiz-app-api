import { jwt } from '@elysiajs/jwt'

export const jwtConfig = jwt({
  name: 'jwt_auth', // this name will be used to access jwt within the request object
  secret: process.env.JWT_SECRET || 'ertsdrsfgvgdfbdfgjfghdfgsdh', // Should be in a .env!!
})