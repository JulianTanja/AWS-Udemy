//import { LoggingFormat } from "aws-cdk-lib/aws-appmesh"
import { CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const awsRegion = 'us-east-1'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'us-east-1_XzBGa2U3Y',
        userPoolWebClientId: '4cc7gbkprn9fncncv5a2qappr1',
        identityPoolId: 'us-east-1:433fe5f2-3502-4cc7-88df-b1e18523a90d',
        authenticationFlowTYpe: 'USER_PASSWORD_AUTH'
    }
})

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser) {
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/us-east-1_XzBGa2U3Y`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: '',
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        })
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}