import { useSetAtom } from "jotai";

import { modalAtom } from "@/features/modal/store";
import { playAtom } from "@/features/playback/api/actions";
import type { TrackListSource } from "@/features/playback/types";

import type { Prettify } from "@/utils/types";
import type { MediaList } from "@/components/media/types";
import type { ImageSource } from "@/components/media/MediaImage";
import { MediaImage } from "@/components/media/MediaImage";
import { ActionButton } from "@/components/ui/ActionButton";
import { TrackDuration } from "./TrackDuration";

export type TrackCardContent = Prettify<
  Pick<React.ComponentProps<typeof ActionButton>, "textContent"> & {
    id: string;
    imageSource: ImageSource;
    duration: number;
  }
>;

export type TrackCardProps = TrackCardContent & {
  trackSource: TrackListSource;
  origin?: MediaList;
};

/**
 * @description Displays information about the current track with 2
 *  different press scenarios (pressing the icon or the whole card will
 *  do different actions).
 */
export function TrackCard({ trackSource, origin, ...props }: TrackCardProps) {
  const playFn = useSetAtom(playAtom);
  const openModal = useSetAtom(modalAtom);

  return (
    <ActionButton
      onPress={() => playFn({ id: props.id, source: trackSource })}
      textContent={props.textContent}
      image={
        <MediaImage
          type="track"
          size={48}
          source={props.imageSource}
          className="shrink-0 rounded-sm"
        />
      }
      asideContent={<TrackDuration duration={props.duration} />}
      iconOnPress={() => openModal({ type: "track", id: props.id, origin })}
    />
  );
}
