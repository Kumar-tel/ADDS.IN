import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import OfferCard from "@/components/OfferCard";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { user } = useAuth();
  const { data: favorites, isLoading } = useFavorites();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-20">
        <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Save your favorite offers</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">Sign in to save and track your favorite deals</p>
        <Button asChild><Link to="/auth">Sign In</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto max-w-lg">
          <h1 className="text-lg font-semibold">My Favorites</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        {isLoading ? (
          <p className="text-center py-8 text-muted-foreground">Loading...</p>
        ) : favorites?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Heart className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No favorites yet</p>
            <p className="text-sm mt-1">Browse offers and tap the heart to save them</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {favorites?.map((fav) => fav.offers && <OfferCard key={fav.id} offer={fav.offers} />)}
          </div>
        )}
      </main>
    </div>
  );
}
