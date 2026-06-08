import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link to="/profile" className="p-1"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 pt-6">
        <p className="text-sm text-muted-foreground">Notification preferences, location settings, and more coming soon.</p>
      </main>
    </div>
  );
}
