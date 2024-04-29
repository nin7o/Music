import { Text, View } from "react-native";

import type { TextColor } from "@/lib/style";
import { cn } from "@/lib/style";
import type { Maybe } from "@/utils/types";

/** @description Shorthand for `<Text numberOfLines={1} />`. */
export function TextLine(props: Text["props"]) {
  return <Text numberOfLines={1} {...props} />;
}

/**
 * @description Design for having 2 rows of text — we can optionally
 *  display 2 pieces of text next to each other in the 2nd row.
 */
export function TextStack(props: {
  content: [string, Maybe<string>] | [string, string, Maybe<string>];
  wrapperClassName?: string;
  colors?: { row1: TextColor; row2: TextColor };
}) {
  return (
    <View className={props.wrapperClassName}>
      <TextLine
        className={cn(
          "font-geistMono text-base text-foreground50",
          props.colors?.row1,
        )}
      >
        {props.content[0]}
      </TextLine>
      <View className="flex-row gap-1">
        <TextLine
          className={cn(
            "flex-1 font-geistMonoLight text-xs text-foreground100",
            props.colors?.row2,
          )}
        >
          {props.content[1] ?? ""}
        </TextLine>
        {!!props.content[2] && (
          <TextLine
            className={cn(
              "shrink-0 font-geistMonoLight text-xs text-foreground100",
              props.colors?.row2,
            )}
          >
            {props.content[2]}
          </TextLine>
        )}
      </View>
    </View>
  );
}
