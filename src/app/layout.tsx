import './globals.css';
import { BoardProvider } from './context/BoardContext';

export const metadata = {
  title: 'Trello Realtime App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BoardProvider>{children}</BoardProvider>
      </body>
    </html>
  );
}