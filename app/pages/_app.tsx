import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
} from 'blitz';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import { queryCache } from 'react-query';
import LoginForm from 'app/auth/components/LoginForm';
import { defaultTheme, ThemeProvider } from '@xstyled/styled-components';

const theme = {
  ...defaultTheme,
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || (page => page);
  const router = useRouter();

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries();
      }}
    >
      <ThemeProvider theme={theme}>
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />;
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title='Sorry, you are not authorized to access this'
      />
    );
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    );
  }
}
