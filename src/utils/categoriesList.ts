export interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
}

export interface CategoryGroup {
    id: string;
    groupName: string;
    uri?: string
    items?: CategoryItem[];
}
export const categorieslist: CategoryGroup[] = [
    {
        "id": "group_nature",
        "groupName": "Nature & Landscapes",
        "uri": 'https://i.pinimg.com/736x/78/ff/86/78ff86929f5d2b06ada8e48692203b0c.jpg',
        "items": [
            { "id": "nature_1", "name": "mountains", "slug": "mountains","thumbnail":'https://i.pinimg.com/736x/71/80/a2/7180a2245ae6c58735a3db01dedbe360.jpg' },
            { "id": "nature_2", "name": "forests & woods", "slug": "forests", "thumbnail":"https://i.pinimg.com/1200x/d5/bc/f9/d5bcf982acf044a87c375c6cd9ece245.jpg" },
            { "id": "nature_3", "name": "ocean & beaches", "slug": "ocean","thumbnail":"https://i.pinimg.com/736x/c5/af/1d/c5af1d9968df50fd6f96cd460ddeabff.jpg" },
            { "id": "nature_4", "name": "sunsets", "slug": "sunsets","thumbnail":"https://i.pinimg.com/1200x/28/8b/94/288b9431b21dda0b3a8731c52c037619.jpg" },
            { "id": "nature_5", "name": "flowers", "slug": "flowers","thumbnail":"https://i.pinimg.com/736x/65/e9/2c/65e92c7f83e4175345ad1698426f0400.jpg" },
            { "id": "nature_6", "name": "wildlife", "slug": "wildlife","thumbnail":"https://i.pinimg.com/736x/a1/29/24/a12924e0ca791ff825ad8c912355d270.jpg" },
            { "id": "nature_7", "name": "seasons", "slug": "seasons","thumbnail":"https://i.pinimg.com/736x/23/6f/c4/236fc441dc22ef28475f7646e1a84606.jpg" },
            { "id": "nature_8", "name": "underwater", "slug": "underwater","thumbnail":"https://i.pinimg.com/736x/e8/d3/dc/e8d3dc845d172c0cea8508fb47d4ff15.jpg" }
        ]
    },
    {
        "id": "group_art",
        "groupName": "Art & Design",
        "uri": 'https://i.pinimg.com/736x/23/16/7a/23167a31fd55ccd26630871d51ad1e68.jpg',
        "items": [
            { "id": "art_1", "name": "abstract", "slug": "abstract" },
            { "id": "art_2", "name": "minimalist", "slug": "minimalist" },
            { "id": "art_3", "name": "patterns", "slug": "patterns" },
            { "id": "art_4", "name": "geometric", "slug": "geometric" },
            { "id": "art_5", "name": "3d renders", "slug": "3d-renders" },
            { "id": "art_6", "name": "digital art", "slug": "digital-art" },
            { "id": "art_7", "name": "typography", "slug": "typography" },
            { "id": "art_8", "name": "vector", "slug": "vector" }
        ]
    },
    {
        "id": "group_urban",
        "groupName": "Urban & Architecture",
        "uri": 'https://i.pinimg.com/1200x/d0/83/e4/d083e4eebd49ea37cf77a07f96e5982a.jpg',
        "items": [
            { "id": "urban_1", "name": "cityscapes", "slug": "cityscapes" },
            { "id": "urban_2", "name": "night city", "slug": "night-city" },
            { "id": "urban_3", "name": "modern architecture", "slug": "architecture" },
            { "id": "urban_4", "name": "street photography", "slug": "street" },
            { "id": "urban_5", "name": "bridges", "slug": "bridges" },
            { "id": "urban_6", "name": "interiors", "slug": "interiors" },
            { "id": "urban_7", "name": "landmarks", "slug": "landmarks" }
        ]
    },
    {
        "id": "group_space",
        "groupName": "Science & Space",
        "uri": 'https://i.pinimg.com/1200x/19/8d/3d/198d3da8d56939bed954dd9bc5356814.jpg',
        "items": [
            { "id": "space_1", "name": "Galaxy & Nebula", "slug": "galaxy" },
            { "id": "space_2", "name": "Planets", "slug": "planets" },
            { "id": "space_3", "name": "Stars", "slug": "stars" },
            { "id": "space_4", "name": "Astronauts", "slug": "astronauts" },
            { "id": "space_5", "name": "Sci-Fi", "slug": "scifi" },
            { "id": "space_6", "name": "Cyberpunk", "slug": "cyberpunk" }
        ]
    },
    {
        "id": "group_pop",
        "groupName": "Pop Culture",
        "uri": 'https://i.pinimg.com/1200x/70/38/80/703880553b7883b4122c551581d43927.jpg',
        "items": [
            { "id": "pop_1", "name": "Anime", "slug": "anime" },
            { "id": "pop_2", "name": "Gaming", "slug": "gaming" },
            { "id": "pop_3", "name": "Movies", "slug": "movies" },
            { "id": "pop_4", "name": "Cars", "slug": "cars" },
            { "id": "pop_5", "name": "Sports", "slug": "sports" },
            { "id": "pop_6", "name": "Music", "slug": "music" },
            { "id": "pop_7", "name": "Superheroes", "slug": "superheroes" }
        ]
    },
    {
        "id": "group_tech",
        "groupName": "Tech & Style",
        "uri": 'https://i.pinimg.com/736x/23/0e/30/230e306f9fc5c35cfe5e1062bf1ce7c3.jpg',
        "items": [
            { "id": "tech_1", "name": "AMOLED / Dark", "slug": "amoled" },
            { "id": "tech_2", "name": "Gradients", "slug": "gradients" },
            { "id": "tech_3", "name": "Pastel", "slug": "pastel" },
            { "id": "tech_4", "name": "Neon", "slug": "neon" },
            { "id": "tech_5", "name": "Glitch", "slug": "glitch" },
            { "id": "tech_6", "name": "Macro", "slug": "macro" }
        ]
    }
]
