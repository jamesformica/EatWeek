interface RecipeSearchResult {
	count: number;
	recipes: Recipe[];
}

interface Recipe {
	title: string;
	image_url: string;
	publisher: string;
	recipe_id: string;
	social_rank: number;
}