import { Highlight, themes } from "prism-react-renderer"

export const CodeDisplay = (props: { code?: string}) => (
    <Highlight
        theme={themes.vsDark}
        code={props.code || ''}
        language="tsx"
    >
        {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className="rounded p-4 text-wrap" style={style}>
                {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>
)
