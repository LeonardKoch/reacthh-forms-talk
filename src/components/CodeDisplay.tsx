import { Highlight, themes } from "prism-react-renderer"

export const CodeDisplay = (props: { code?: string}) => (
    <Highlight
        // theme={themes.github}
        theme={themes.vsDark}
        code={props.code || ''}
        language="tsx"
    >
        {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre className="rounded p-4" style={style}>
        {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
                {/*<span className="pr-4">{i + 1}</span>*/}
                {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                ))}
            </div>
        ))}
      </pre>
        )}
    </Highlight>
)
