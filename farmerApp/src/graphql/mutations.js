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
/**
# Try to write your query here
mutation createFarmingActivities(
  $category: String!
  $shortDescription: String
  $cultivationApproach: String
  $crops: Boolean
  $livestock: Boolean
  $products: Boolean
) {
  createFarmingActivities(data: {
    category: $category
    shortDescription: $shortDescription
    cultivationApproach: $cultivationApproach
    selling: {
      create: {
        crops: $crops
        livestock: $livestock
        products: $products
      }
    }
    farmer: {
      connect: {
        email: "piet@piet.com"
      }
    }
  }) {
    category
    shortDescription
    cultivationApproach
  }
}
 */
export const FARMINGACTIVITIES_MUTATION = gql`
         mutation createFarmingActivities($category: String!, $shortDescription: String, $cultivationApproach: String, $crops: Boolean, $livestock: Boolean, $products: Boolean) {
           createFarmingActivities(category: $category, shortDescription: $shortDescription, cultivationApproach: $cultivationApproach, crops: $crops, livestock: $livestock, products: $products) {
             selling {
               crops
               livestock
               products
             }
           }
         }
       `;

export const CREATEFARM_MUTATION = gql `
mutation createFarm(
      $totalLand: Int!,
      $cultivatedLand: Int!,
      $shareLocation: Boolean!,
      $farmersAssociations: String,
      $lat: Float,
      $lng: Float
){
  createFarm(
    totalLand: $totalLand
    cultivatedLand: $cultivatedLand
    shareLocation: $shareLocation
    farmersAssociations: $farmersAssociations
    lat: $lat
    lng: $lng    
  ){
    totalLand
    farmer{
      name
    }
  }
}
`;