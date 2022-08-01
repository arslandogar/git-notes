import { FC, useState, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

interface Props {
  url: string | undefined;
  fullView?: boolean;
}

export const CodeView: FC<Props> = ({ url, fullView }) => {
  const [code, setCode] = useState<string[]>([]);

  useEffect(() => {
    if (url) {
      const fetchCode = async () => {
        const response = await fetch(url);
        const text = await response.text();
        setCode(text.split('\n'));
      };
      fetchCode();
    }
  }, [url]);

  return (
    <div
      data-testid="codeView-container"
      className={`mockup-code bg-white text-black ${fullView ? 'h-screen' : 'h-60'}`}
    >
      <AutoSizer>
        {({ height, width }) => (
          <List height={height} itemCount={code.length} itemSize={30} width={width}>
            {({ index, style }) => (
              <pre data-testid={`codeView-pre-${index}`} style={style} data-prefix={index + 1}>
                <code>{code[index]}</code>
              </pre>
            )}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};