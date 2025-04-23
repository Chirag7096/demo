import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/app/api/graphql/schema.graphql',
  documents: './**/*.tsx',
  generates: {
    './src/app/api/graphql/types.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {withHooks: true},
    },
  },
};

export default config;
