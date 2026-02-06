import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function BlogPost({ content }: { content: string }) {
  const { data, content: body } = matter(content);

  return (
    <article>
      {data.published && (
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {body}
        </ReactMarkdown>
      )}
    </article>
  );
}
