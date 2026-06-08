import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User, Settings, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-20">
        <User className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Sign in for personalized recommendations and saved offers</p>
        <Button asChild><Link to="/auth">Sign In</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto max-w-lg">
          <h1 className="text-lg font-semibold">Profile</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-6 space-y-4">
        {/* User info */}
        <Card className="p-4 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.user_metadata?.display_name || user.email}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </Card>

        {/* Menu */}
        <div className="space-y-2">
          <Link to="/favorites" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
            <Heart className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">My Favorites</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 text-destructive hover:text-destructive"
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
        >
          <LogOut className="h-4 w-4 mr-2" /> Sign Out
        </Button>
      </main>
    </div>
  );
}
