import * as React from "react";
import { emoji } from "./style.scss";
import getEmoji from "./getEmoji";

export interface EmojiProps {
  type: string;
}

/**
 * github 支持的 emoji
 * 找不到支持的或网不好就会返回原文字
 * 大小会和周围元素相同
 * @see https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md
 */
export default function Emoji({ type }: EmojiProps) {
  const [src, setSrc] = React.useState("");
  const imgRef = React.useRef<HTMLImageElement>(null);
  React.useEffect(() => {
    getEmoji(type).then(result => setSrc(result));
  }, [type]);
  React.useLayoutEffect(() => {
    if (imgRef.current) {
      const { fontSize } = getComputedStyle(imgRef.current);
      const size = parseInt(fontSize);
      imgRef.current.width = size;
      imgRef.current.height = size;
    }
  }, [src]);
  if (src) {
    return (
      <img
        ref={imgRef}
        title={type}
        alt={type}
        height={20}
        width={20}
        src={src}
        className={emoji}
      />
    );
  }
  return <>:{type}:</>;
}
