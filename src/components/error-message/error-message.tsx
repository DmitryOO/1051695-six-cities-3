
import { memo } from 'react';
function ErrorMessageComponent({ error }: { error: string }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex:9999
    }}
    >
      <div style={{ backgroundColor: 'red', color: 'white',padding: '20px', borderRadius: '5px' }}>{error}</div>
    </div>
  );
}

const ErrorMessage = memo(ErrorMessageComponent);

export default ErrorMessage;
