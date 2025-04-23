import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  submitContactForm: MessageResponse;
};


export type MutationSubmitContactFormArgs = {
  email: Scalars['String']['input'];
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']['output']>;
};

export type SubmitContactFormMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  fileUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type SubmitContactFormMutation = { __typename?: 'Mutation', submitContactForm: { __typename?: 'MessageResponse', message: string } };


export const SubmitContactFormDocument = gql`
    mutation SubmitContactForm($firstName: String!, $lastName: String, $email: String!, $message: String!, $fileUrl: String) {
  submitContactForm(
    firstName: $firstName
    lastName: $lastName
    email: $email
    message: $message
    fileUrl: $fileUrl
  ) {
    message
  }
}
    `;
export type SubmitContactFormMutationFn = Apollo.MutationFunction<SubmitContactFormMutation, SubmitContactFormMutationVariables>;

/**
 * __useSubmitContactFormMutation__
 *
 * To run a mutation, you first call `useSubmitContactFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitContactFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitContactFormMutation, { data, loading, error }] = useSubmitContactFormMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      message: // value for 'message'
 *      fileUrl: // value for 'fileUrl'
 *   },
 * });
 */
export function useSubmitContactFormMutation(baseOptions?: Apollo.MutationHookOptions<SubmitContactFormMutation, SubmitContactFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitContactFormMutation, SubmitContactFormMutationVariables>(SubmitContactFormDocument, options);
      }
export type SubmitContactFormMutationHookResult = ReturnType<typeof useSubmitContactFormMutation>;
export type SubmitContactFormMutationResult = Apollo.MutationResult<SubmitContactFormMutation>;
export type SubmitContactFormMutationOptions = Apollo.BaseMutationOptions<SubmitContactFormMutation, SubmitContactFormMutationVariables>;