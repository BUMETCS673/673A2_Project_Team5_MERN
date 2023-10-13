import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function BasePage() {
  return (
    <>
      <Welcome />
      {/* <ColorSchemeToggle /> */}
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
        <a href="/home">Home</a>
        <a href="/login">Login</a>
        <a href="/document">Document</a>
      </div>
    </>
  );
}
