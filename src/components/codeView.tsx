import { FC, useState, useEffect } from 'react';

interface Props {
  url: string | undefined;
}

export const CodeView: FC<Props> = ({ url }) => {
  const [code, setCode] = useState<string[]>([]);

  useEffect(() => {
    if (url) {
      fetch(url)
        .then((res) => res.text())
        .then((text) => setCode(text.split('\n').map((line) => line)));
    }
  }, [url]);

  return (
    <div className="mockup-code overflow-clip h-60 bg-white text-black">
      {code.map((line, index) => (
        <pre key={index} data-prefix={index + 1}>
          <code>{line}</code>
        </pre>
      ))}
    </div>
  );
};
