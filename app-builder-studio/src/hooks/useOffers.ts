import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Offer = Tables<"offers">;
export type Category = Tables<"categories">;

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useOffers(categorySlug?: string) {
  return useQuery({
    queryKey: ["offers", categorySlug],
    queryFn: async () => {
      let query = supabase.from("offers").select("*, categories(*)");
      if (categorySlug) {
        const { data: cat } = await supabase.from("categories").select("id").eq("slug", categorySlug).single();
        if (cat) query = query.eq("category_id", cat.id);
      }
      const { data, error } = await query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useTrendingOffers() {
  return useQuery({
    queryKey: ["offers", "trending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("*, categories(*)")
        .eq("is_trending", true)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });
}

export function useOffer(offerId: string) {
  return useQuery({
    queryKey: ["offer", offerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("*, categories(*)")
        .eq("id", offerId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!offerId,
  });
}
