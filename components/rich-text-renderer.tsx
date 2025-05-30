import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

interface RichTextRendererProps {
    document: Document;
    className?: string;
}

export function RichTextRenderer({ document, className = "" }: RichTextRendererProps) {
    const options = {
        renderMark: {
            [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
            [MARKS.ITALIC]: (text: ReactNode) => <em className="italic">{text}</em>,
            [MARKS.UNDERLINE]: (text: ReactNode) => <u className="underline">{text}</u>,
            [MARKS.CODE]: (text: ReactNode) => (
                <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
                    {text}
                </code>
            ),
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => (
                <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (node: any, children: ReactNode) => (
                <h1 className="text-2xl font-bold mb-4 text-white">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (node: any, children: ReactNode) => (
                <h2 className="text-xl font-semibold mb-3 text-white">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (node: any, children: ReactNode) => (
                <h3 className="text-lg font-medium mb-2 text-white">{children}</h3>
            ),
            [BLOCKS.UL_LIST]: (node: any, children: ReactNode) => (
                <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
            ),
            [BLOCKS.OL_LIST]: (node: any, children: ReactNode) => (
                <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (node: any, children: ReactNode) => (
                <li className="text-white/70">{children}</li>
            ),
            [BLOCKS.QUOTE]: (node: any, children: ReactNode) => (
                <blockquote className="border-l-4 border-blue-400 pl-4 italic text-white/80 mb-4">
                    {children}
                </blockquote>
            ),
            [BLOCKS.HR]: () => <hr className="border-white/20 my-6" />,
            [INLINES.HYPERLINK]: (node: any, children: ReactNode) => (
                <a
                    href={node.data.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                    {children}
                </a>
            ),
        },
    };

    return (
        <div className={className}>
            {documentToReactComponents(document, options)}
        </div>
    );
}
