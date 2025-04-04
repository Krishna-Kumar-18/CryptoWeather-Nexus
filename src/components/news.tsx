export default async function News() {
  const res = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&q=crypto&language=en&size=5`,
    { cache: 'no-store' }
  );

  const data = await res.json();

  const articles = data.results.map((article: any) => ({
    title: article.title,
    link: article.link,
    source: article.source_name,
    date: article.pubDate,
  })) || [];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📰 Top 5 Crypto News</h2>
      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((article: any, index: any) => (
            <li key={index} className="flex items-start space-x-4">
              <div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {article.title}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {article.source} • {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
