import React, { Fragment } from "react";
import Atom from "@atom";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
  content: string | null;
}

const components: Components = {
  img: ({ ...props }) => (
    <Atom.Window label={typeof props.alt === "string" && props.alt ? props.alt : "image"} className="my-10">
      <img {...props} className="w-full bg-paper-deep" />
    </Atom.Window>
  ),
  p: ({ children }) => (
    <div className="my-5 text-[17px] leading-8 text-ink-soft">{children}</div>
  ),
  a: ({ children, className, ...props }) => className?.includes("article-body-image-wrapper") ? (
    <a {...props} className="block">
      {children}
    </a>
  ) : (
    <a
      {...props}
      className="text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand-deep"
    >
      {children}
    </a>
  ),
  h1: ({ children }) => (
    <h1 className="mt-14 mb-4 font-serif text-5xl leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-3 font-serif text-4xl leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 mb-2 font-serif text-3xl leading-snug">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 mb-2 text-lg font-semibold">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="mt-6 mb-2 font-mono text-sm uppercase tracking-wider text-muted">{children}</h5>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-brand pl-6 font-serif text-2xl italic leading-snug text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-line" />,
  div: ({ className, children, ...props }) => {
    if (className?.includes("highlight__panel")) return null;
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  },
  pre: ({ children }) => {
    const codeElement = React.Children.only(
      children,
    ) as React.ReactElement<any>;
    const className: string = codeElement.props.className || "";
    const match = /language-(\w+)/.exec(className);

    return match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        className="my-8 overflow-x-auto rounded-sm text-sm"
      >
        {String(codeElement.props.children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <pre className="my-8 overflow-x-auto rounded-sm bg-ink px-5 py-4 font-mono text-sm text-paper">
        {codeElement.props.children}
      </pre>
    );
  },
  code: ({ children, className, ...props }) => {
    return (
      <code
        {...props}
        className="rounded-sm bg-paper-deep px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
      >
        {children}
      </code>
    );
  },
  ul: ({ children, className, ...props }) => {
    return (
      <ul {...props} className="my-5 ml-5 list-outside list-disc space-y-2 text-[17px] leading-8 text-ink-soft marker:text-brand-deep">
        {children}
      </ul>
    );
  },
  ol: ({ children, className, ...props }) => {
    return (
      <ol {...props} className="my-5 ml-5 list-outside list-decimal space-y-2 text-[17px] leading-8 text-ink-soft marker:font-mono marker:text-sm marker:text-muted">
        {children}
      </ol>
    );
  },
};

const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <Fragment>
      <div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    </Fragment>
  );
};

export default Markdown;
