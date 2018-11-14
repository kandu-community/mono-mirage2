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
    $street: String,
    $area: String,
    $postalCode: String,
    $province: String
) {
    createAddress(
    street: $street,
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
    $firstName: String,
    $lastName: String,
    $cell: String,
    $landLine: String,
    $idSA: String
) {
    createPersonalDetails(
        firstName: $firstName,
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
         mutation createFarmingActivities($category: String!, $shortDescription: String, $cultivationApproach: String, $crops: Boolean, $livestock: Boolean, $products: Boolean, $seeds: Boolean, $distributors: Boolean) {
           createFarmingActivities(category: $category, shortDescription: $shortDescription, cultivationApproach: $cultivationApproach, crops: $crops, livestock: $livestock, products: $products, seeds: $seeds, distributors: $distributors) {
             selling {
               crops
               livestock
               products
               seeds
               distributors
             }
           }
         }
       `;

export const CREATEFARM_MUTATION = gql `
mutation createFarm(
      $name: String,
      $totalLand: Int!,
      $cultivatedLand: Int!,
      $shareLocation: Boolean!,
      $farmersAssociations: String,
      $lat: Float,
      $lng: Float,
      $area: String,
      $post_code: Int,
      $short_description: String,
      $long_description: String,
      $website: String,
      $visible_ofn: Boolean,
      $activities: String,
      $cooperative: Boolean,
      $date_started: DateTime,
      $soil_structure: String,
      $soil_ph: String,
      $methodz: String,
      $erosion_control: String,
      $water_source: String,
      $water_storage: String,
      $irrigation: String,
      $fertilizer: String
){
  createFarm(
name: $name totalLand: $totalLand cultivatedLand: $cultivatedLand shareLocation: $shareLocation lat: $lat lng: $lng farmersAssociations: $farmersAssociations area: $area post_code: $post_code short_description: $short_description long_description: $long_description website: $website visible_ofn: $visible_ofn activities: $activities cooperative: $cooperative date_started: $date_started soil_structure: $soil_structure soil_ph: $soil_ph methodz: $methodz erosion_control: $erosion_control water_source: $water_source water_storage: $water_storage irrigation: $irrigation fertilizer: $fertilizer 
 
  ){
    totalLand
    farmer{
      name
    }
  }
}
`;