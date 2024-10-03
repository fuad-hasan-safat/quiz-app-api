import { jwt } from '@elysiajs/jwt'

export const jwtConfig = jwt({
  name: 'jwt_auth', // this name will be used to access jwt within the request object
  secret: process.env.JWT_SECRET || 'ertsdrsfgvgdfbdfgjfghdfgsdh', // Should be in a .env!!
})



export async function jwtAuthorizer(auth : any, jwt_auth: any){
  console.log("Inside derive");

        // 2. Check if the 'Authorization' header contains a Bearer token
        //    If it starts with 'Bearer ', extract the token string after 'Bearer '
        //    Otherwise, set token to null indicating no valid token is present
        const token = auth && auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
        console.log({auth,  token});


        // 3. If no token is found, return an object with user set to null
        if (!token) return { user: null };

        // 4. Verify the JWT token using the jwt_auth module
        //    This step authenticates the token and retrieves the user information
        const user = await jwt_auth.verify(token.trim());

        // 5. Return an object containing the authenticated user information
        //    This will be available inside de request object
        return { user };
}