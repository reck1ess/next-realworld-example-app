import marked from "marked";

import ArticleMeta from "@/components/article/ArticleMeta";
import CommentList from "@/components/comment/CommentList";
import { useArticle } from "@/lib/context/ArticleContext";
import { ArticleType } from "@/lib/types/articleType";

export default function ArticlePage() {
  const article: ArticleType = useArticle();

  const markup = {
    __html: marked(article.body, { sanitize: true }),
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12">
            <div dangerouslySetInnerHTML={markup} />
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />
        <div className="article-actions" />
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
}