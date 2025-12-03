import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";

const Index = () => {
  return (
    <div className="min-h-screen">
<Hero />
      <Categories />
      <FeaturedProducts />
</div>
  );
};

export default Index;