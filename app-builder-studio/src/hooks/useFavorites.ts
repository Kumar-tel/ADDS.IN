import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

export function useFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("*, offers(*, categories(*))")
        .eq("user_id", user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (offerId: string) => {
      if (!user) throw new Error("Must be logged in");

      const { data: existing } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("offer_id", offerId)
        .single();

      if (existing) {
        await supabase.from("favorites").delete().eq("id", existing.id);
        return { added: false };
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, offer_id: offerId });
        return { added: true };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast({
        title: result.added ? "Added to favorites" : "Removed from favorites",
      });
    },
  });
}

export function useIsFavorite(offerId: string) {
  const { data: favorites } = useFavorites();
  return favorites?.some((f) => f.offer_id === offerId) ?? false;
}
