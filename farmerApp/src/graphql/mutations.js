import gql from 'graphql-tag'

// This is the GraphQL mutation that will handle creating new users on our GraphQL server. It takes the username, email, and password of a user. These variables will be passed from the SignUp component.
export const SIGNUP_MUTATION = gql `
mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
        token,
        user {
            name
            email
            
        }
    }
}
`

export const LOGIN_MUTATION = gql `
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
}
`
export const ADDRESS_MUTATION = gql `
mutation addAddress(
    $line1: String,
    $line2: String,
    $line3: String,
    $area: String,
    $postalCode: String,
    $province: String
) {
    createAddress(
    line1: $line1,
    line2: $line2,
    line3: $line3,
    area: $area,
    postalCode: $postalCode,
    province: $province
    ) {
    resident {
        name
        email
    }
    }
}
`
export const PERSONALDETAILS_MUTATION = gql `
mutation addPersonalDetails(
    $lastName: String,
    $cell: String,
    $landLine: String,
    $idSA: String
) {
    createPersonalDetails(
        lastName: $lastName,
        cell: $cell,
        landLine: $landLine,
        idSA: $idSA
    ) {
    person {
        name
        email
    }
    }
}
`
export const FARMINGACTIVITIES_MUTATION = gql `
mutation addFarmingActivites(
      $category: String!,
      $shortDescription: String,
      $longDescription: String
) {
    createFarmingActivities(
        category: $category,
        shortDescription: $shortDescription,
        longDescription: $longDescription
    ) {
            farmer {
                name
                email
            }
    }
}
`