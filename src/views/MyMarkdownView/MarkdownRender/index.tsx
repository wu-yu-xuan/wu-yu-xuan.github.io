import * as React from 'react';
import { lexer, Tokens } from 'marked';
import * as style from './style.scss';
import HeadingRender from './HeadingRender';
import HrRender from './HrRender';

interface MarkdownRenderProps {
  source: string;
  heading?: React.ComponentType<Tokens.Heading>;
  hr?: React.ComponentType<Tokens.Hr>;
}

export default class MarkdownRender extends React.PureComponent<MarkdownRenderProps>{
  public static defaultProps: MarkdownRenderProps = {
    source: '',
    heading: HeadingRender,
    hr: HrRender
  }
  public render() {
    const { source } = this.props;
    const lexList = lexer(source);
    const result = lexList.map((token, key) => {
      const Component: React.ComponentType = this.props[token.type];
      return Component && <Component {...token} key={key} />;
    })
    return <div className={style.markdownContainer}>{result}</div>
  }
}