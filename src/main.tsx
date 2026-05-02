import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

/**
 * Application bootstrap entry point.
 *
 * @remarks
 * Initializes the React root and mounts the application into the DOM.
 * Wraps the app in StrictMode to enable additional development-time checks.
 */
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
