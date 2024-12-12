interface WelcomeProps {
  appName: string;
}

export default function Welcome({ appName }: WelcomeProps) {
  return (
    <div>
      <h2>Welcome to {appName}!</h2>
      <p>This component was imported using the @buffbyte/components alias.</p>
    </div>
  );
}
