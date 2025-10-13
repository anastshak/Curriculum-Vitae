import { gql } from '@apollo/client';

export const CV_QUERY = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
        position_name
        profile {
          full_name
        }
      }
      languages {
        name
        proficiency
      }
      projects {
        id
        name
        start_date
        end_date
        description
        environment
        roles
        responsibilities
        domain
        project {
          id
        }
      }
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;
