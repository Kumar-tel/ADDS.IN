import { useParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useOffers, useCategories } from "@/hooks/useOffers";
import OfferCard from "@/components/OfferCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { data: offers, isLoading } = useOffers(categoryName);
  const { data: categories } = useCategories();
  const category = categories?.find((c) => c.slug === categoryName);
  const [sortBy, setSortBy] = useState<"newest" | "discount">("newest");

  const sorted = offers?.slice().sort((a, b) => {
    if (sortBy === "discount") return (b.discount_percentage ?? 0) - (a.discount_percentage ?? 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <Link to="/" className="p-1"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-lg font-semibold flex-1">{category?.name || categoryName}</h1>
          <Button variant="ghost" size="icon" onClick={() => setSortBy(sortBy === "newest" ? "discount" : "newest")}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        <p className="text-xs text-muted-foreground mb-3">
          {sorted?.length ?? 0} offers · Sorted by {sortBy === "newest" ? "newest" : "highest discount"}
        </p>
        <div className="grid gap-3">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-lg" />)
            : sorted?.map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          {!isLoading && sorted?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No offers in this category yet.</div>
          )}
        </div>
      </main>
    </div>
  );
}
