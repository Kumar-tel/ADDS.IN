import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories, useTrendingOffers, useOffers } from "@/hooks/useOffers";
import { useAuth } from "@/hooks/useAuth";
import CategoryCard from "@/components/CategoryCard";
import OfferCard from "@/components/OfferCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Index() {
  const { user } = useAuth();
  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: trending, isLoading: trendLoading } = useTrendingOffers();
  const { data: allOffers } = useOffers();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b px-4 py-3">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary">ads.in</h1>
            <p className="text-xs text-muted-foreground">Discover the best deals</p>
          </div>
          <Link to={user ? "/profile" : "/auth"} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4 space-y-6">
        {/* Search */}
        <Link to="/search" className="block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search offers, brands, categories..."
              className="pl-10 bg-muted/50 cursor-pointer"
              readOnly
            />
          </div>
        </Link>

        {/* Categories */}
        <section>
          <h2 className="text-base font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-3 gap-2">
            {catLoading
              ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
              : categories?.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
          </div>
        </section>

        {/* Trending */}
        <section>
          <h2 className="text-base font-semibold mb-3">🔥 Trending Offers</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {trendLoading
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 w-64 rounded-lg shrink-0" />)
              : trending?.map((offer) => <OfferCard key={offer.id} offer={offer} compact />)}
          </div>
        </section>

        {/* All Offers */}
        <section>
          <h2 className="text-base font-semibold mb-3">Latest Offers</h2>
          <div className="grid gap-3">
            {allOffers?.slice(0, 8).map((offer) => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
