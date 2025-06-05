export default function RecipePage({
  params,
}: Readonly<{
  params: { recipeId: string };
}>) {
  return (
    <div>
      <h1>Recipe Page</h1>
      <p>Recipe ID: {params.recipeId}</p>
    </div>
  );
}
