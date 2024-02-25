import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'ADA Sign in',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
