import { Link } from "react-router-dom";
import { GraduationCap, Hospital, Landmark, Shirt, UtensilsCrossed, Plane, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Hospital,
  Landmark,
  Shirt,
  UtensilsCrossed,
  Plane,
};

const colorMap: Record<string, string> = {
  colleges: "bg-blue-50 text-blue-600",
  hospitals: "bg-red-50 text-red-600",
  banks: "bg-emerald-50 text-emerald-600",
  fashion: "bg-purple-50 text-purple-600",
  food: "bg-orange-50 text-orange-600",
  travel: "bg-cyan-50 text-cyan-600",
};

type Props = {
  category: { name: string; slug: string; icon: string };
};

export default function CategoryCard({ category }: Props) {
  const Icon = iconMap[category.icon] || GraduationCap;
  const colors = colorMap[category.slug] || "bg-muted text-muted-foreground";

  return (
    <Link
      to={`/category/${category.slug}`}
      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-transform active:scale-95"
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colors}`}>
        <Icon className="h-7 w-7" />
      </div>
      <span className="text-xs font-medium text-foreground">{category.name}</span>
    </Link>
  );
}
