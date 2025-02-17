import { Image as ExpoImage } from "expo-image";
import { cssInterop } from "nativewind";
import { View } from "react-native";

import { Folder } from "@/icons";

import { Colors } from "@/constants/Styles";
import { cn } from "@/lib/style";
import { ReservedNames, ReservedPlaylists } from "../constants";
import type { MediaType } from "../types";

// https://www.nativewind.dev/v4/api/css-interop
const Image = cssInterop(ExpoImage, { className: "style" });

export namespace MediaImage {
  export type ImageSource = string | null;

  export type ImageContent =
    | { type: "playlist"; source: ImageSource | Array<string | null> }
    | { type: Omit<MediaType, "playlist">; source: ImageSource };

  export type Props = ImageContent & {
    radius?: "sm";
    size: number;
    className?: string;
  };
}

/** Image representing some media. */
export function MediaImage({
  type,
  radius,
  size,
  source,
  className,
}: MediaImage.Props) {
  const usedClasses = cn(
    "rounded-lg bg-onSurface",
    { "rounded-sm": radius === "sm" },
    className,
  );

  if (type === "playlist" && Array.isArray(source) && source.length > 0) {
    return (
      <CollageImage {...{ sources: source, size, className: usedClasses }} />
    );
  } else if (type === "folder") {
    return (
      <View style={{ padding: size / 4 }} className={usedClasses}>
        <Folder size={size / 2} color={Colors.neutral100} />
      </View>
    );
  }

  return (
    <Image
      source={getUsedImage({ source, type })}
      placeholder={
        type === "artist"
          ? require("@/resources/images/face-glyph.png")
          : require("@/resources/images/music-glyph.png")
      }
      style={{ width: size, height: size }}
      className={cn(usedClasses, {
        "rounded-full": type === "artist",
        "bg-red": source === ReservedPlaylists.favorites,
      })}
    />
  );
}

/** Helper to return the correct image displayed in `<MediaImage />`. */
function getUsedImage(args: {
  source: MediaImage.ImageSource | Array<string | null>;
  type: Omit<MediaType, "playlist">;
}) {
  if (
    Array.isArray(args.source) ||
    args.source === null ||
    ReservedNames.has(args.source)
  ) {
    if (args.type === "artist")
      return require("@/resources/images/face-glyph.png");
    return require("@/resources/images/music-glyph.png");
  }
  return args.source;
}

/** Only used to represent a playlist. */
function CollageImage({
  size,
  sources,
  className,
}: {
  size: number;
  sources: Array<string | null>;
  className?: string;
}) {
  return (
    <View
      style={{ width: size, height: size }}
      className={cn("flex-row flex-wrap overflow-hidden", className)}
    >
      {sources.slice(0, 4).map((source, idx) => (
        <Image
          key={idx}
          source={source}
          placeholder={require("@/resources/images/music-glyph.png")}
          className="size-1/2"
        />
      ))}
    </View>
  );
}
