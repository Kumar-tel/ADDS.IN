import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Clock, MapPin, Copy, Check } from "lucide-react";
import { useOffer } from "@/hooks/useOffers";
import { useAuth } from "@/hooks/useAuth";
import { useIsFavorite, useToggleFavorite } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function OfferDetails() {
  const { offerId } = useParams<{ offerId: string }>();
  const { data: offer, isLoading } = useOffer(offerId!);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isFav = useIsFavorite(offerId!);
  const toggleFav = useToggleFavorite();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyCode = () => {
    if (offer?.offer_code) {
      navigator.clipboard.writeText(offer.offer_code);
      setCopied(true);
      toast({ title: "Code copied!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: offer?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  if (!offer) return <div className="p-8 text-center text-muted-foreground">Offer not found.</div>;

  const expired = offer.expires_at && new Date(offer.expires_at) < new Date();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="h-5 w-5" /></button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={share}><Share2 className="h-4 w-4" /></Button>
            {user && (
              <Button variant="ghost" size="icon" onClick={() => toggleFav.mutate(offer.id)}>
                <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {offer.image_url && (
            <img src={offer.image_url} alt={offer.title} className="h-full w-full object-cover" />
          )}
          {expired && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg py-2 px-4">Expired</Badge>
            </div>
          )}
          {offer.discount_percentage && !expired && (
            <Badge className="absolute left-3 bottom-3 bg-accent text-accent-foreground font-bold text-lg py-1 px-3">
              {offer.discount_percentage}% OFF
            </Badge>
          )}
        </div>

        <div className="px-4 pt-4 space-y-4">
          <div>
            <h1 className="text-xl font-bold">{offer.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{offer.merchant_name}</p>
          </div>

          {/* Price */}
          {(offer.original_price || offer.discounted_price) && (
            <div className="flex items-baseline gap-3">
              {offer.discounted_price !== null && offer.discounted_price !== undefined && (
                <span className="text-2xl font-bold text-secondary">₹{offer.discounted_price}</span>
              )}
              {offer.original_price && (
                <span className="text-lg text-muted-foreground line-through">₹{offer.original_price}</span>
              )}
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {offer.location && (
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {offer.location}</span>
            )}
            {offer.expires_at && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {expired ? "Expired" : `Expires ${formatDistanceToNow(new Date(offer.expires_at), { addSuffix: true })}`}
              </span>
            )}
          </div>

          {/* Description */}
          {offer.description && <p className="text-sm leading-relaxed">{offer.description}</p>}

          {/* Code */}
          {offer.offer_code && !expired && (
            <div className="flex items-center gap-2 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-3">
              <code className="flex-1 text-center font-mono text-lg font-bold text-primary">{offer.offer_code}</code>
              <Button variant="outline" size="sm" onClick={copyCode}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}

          {/* T&C */}
          {offer.terms_and_conditions && (
            <Collapsible>
              <CollapsibleTrigger className="text-sm font-medium text-primary underline-offset-4 hover:underline">
                Terms & Conditions
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {offer.terms_and_conditions}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </main>

      {/* CTA */}
      {!expired && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-card border-t p-3">
          <div className="mx-auto max-w-lg">
            <Button className="w-full h-12 text-base font-semibold bg-primary" asChild>
              {offer.offer_url ? (
                <a href={offer.offer_url} target="_blank" rel="noopener noreferrer">Get This Offer</a>
              ) : (
                <span onClick={copyCode}>Copy Code & Get Offer</span>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
