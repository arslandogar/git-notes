import { FC, useState, useEffect } from 'react';

interface Props {
  url: string | undefined;
  fullView?: boolean;
}

export const CodeView: FC<Props> = ({ url, fullView }) => {
  const [code, setCode] = useState<string[]>([]);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => res.text())
        .then((text) => setCode(text.split('\n').map((line) => line)));
    }
  }, [url]);

  return (
    <div className={`mockup-code overflow-auto bg-white text-black ${fullView ? '' : 'h-60'}`}>
      {code.map((line, index) => (
        <pre key={index} data-prefix={index + 1}>
          <code>{line}</code>
        </pre>
      ))}
    </div>
  );
};
