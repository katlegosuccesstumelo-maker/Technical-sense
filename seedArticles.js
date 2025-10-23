onst { createArticle } = require('./models/articleModel');

const seedArticles = async () => {
  const articles = [
    {
      title: "AI in Robotics",
      description: "Exploring how AI powers modern robots and automation.",
      image_url: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      category: "AI"
    },
    {
      title: "ChatGPT Advancements",
      description: "The latest updates and capabilities of ChatGPT.",
      image_url: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg",
      category: "AI"
    },
    {
      title: "AI in Healthcare",
      description: "How artificial intelligence is transforming healthcare.",
      image_url: "https://images.pexels.com/photos/426583/pexels-photo-426583.jpeg",
      category: "AI"
    },
    {
      title: "Self-Driving Cars",
      description: "AI technology behind autonomous vehicles.",
      image_url: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      category: "AI"
    },
    {
      title: "AI Tools for Creators",
      description: "Top AI tools to boost productivity and creativity.",
      image_url: "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg",
      category: "AI"
    }
  ];

  for (const article of articles) {
    await createArticle(article.title, article.description, article.image_url, article.category);
    console.log(`Inserted: ${article.title}`);
  }

  console.log("✅ All sample AI articles added!");
};

seedArticles().then(() => process.exit());