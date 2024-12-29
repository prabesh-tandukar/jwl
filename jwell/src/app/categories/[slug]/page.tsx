// src/app/categories/[slug]/page.tsx
async function getCategoryProducts(slug: string) {
    const supabase = createClient(...);
    
    // First get the category
    const { data: category } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
  
    // Then get products with their collection info
    const { data: products } = await supabase
      .from('products')
      .select(`
        *,
        collections (
          name,
          slug
        )
      `)
      .eq('category_id', category.id);
  
    return { category, products };
  }
  
  export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const { category, products } = await getCategoryProducts(params.slug);
  
    // Group products by collection
    const productsByCollection = _.groupBy(products, 'collection.name');
  
    return (
      <div>
        <h1>{category.name}</h1>
        
        {Object.entries(productsByCollection).map(([collectionName, products]) => (
          <section key={collectionName}>
            <h2>{collectionName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }