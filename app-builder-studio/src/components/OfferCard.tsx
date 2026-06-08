import { Heart, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useIsFavorite, useToggleFavorite } from "@/hooks/useFavorites";
import { formatDistanceToNow } from "date-fns";

type OfferCardProps = {
  offer: {
    id: string;
    title: string;
    merchant_name: string;
    discount_percentage: number | null;
    image_url: string | null;
    location: string | null;
    expires_at: string | null;
    is_featured: boolean;
  };
  compact?: boolean;
};

export default function OfferCard({ offer, compact }: OfferCardProps) {
  const { user } = useAuth();
  const isFav = useIsFavorite(offer.id);
  const toggleFav = useToggleFavorite();

  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${compact ? "w-64 flex-shrink-0" : ""}`}>
      <Link to={`/offer/${offer.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {offer.image_url ? (
            <img src={offer.image_url} alt={offer.title} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
          )}
          {offer.discount_percentage && (
            <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground font-bold text-sm">
              {offer.discount_percentage}% OFF
            </Badge>
          )}
          {offer.is_featured && (
            <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground text-xs">Featured</Badge>
          )}
        </div>
      </Link>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/offer/${offer.id}`} className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2">{offer.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{offer.merchant_name}</p>
          </Link>
          {user && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFav.mutate(offer.id);
              }}
              className="shrink-0 p-1"
            >
              <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          {offer.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {offer.location}
            </span>
          )}
          {offer.expires_at && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {formatDistanceToNow(new Date(offer.expires_at), { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
