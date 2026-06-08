import { useState } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useOffers } from "@/hooks/useOffers";
import OfferCard from "@/components/OfferCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data: allOffers } = useOffers();

  const filtered = query.trim()
    ? allOffers?.filter(
        (o) =>
          o.title.toLowerCase().includes(query.toLowerCase()) ||
          o.merchant_name.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()) ||
          o.location?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link to="/" className="p-1"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search offers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-8"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        {!query.trim() && (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Start typing to search offers</p>
          </div>
        )}
        {query.trim() && filtered?.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
        {filtered && filtered.length > 0 && (
          <>
            <p className="text-xs text-muted-foreground mb-3">{filtered.length} results</p>
            <div className="grid gap-3">
              {filtered.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
