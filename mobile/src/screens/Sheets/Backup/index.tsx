import { View } from "react-native";

import { useExportBackup, useImportBackup } from "./data";

import { mutateGuard } from "@/lib/react-query";
import { Button } from "@/components/Form";
import { Sheet } from "@/components/Sheet";
import { TStyledText } from "@/components/Typography";

/** Sheet allowing us to utilize the "backup" feature of this app. */
export default function BackupSheet() {
  const exportBackup = useExportBackup();
  const importBackup = useImportBackup();

  const inProgress = exportBackup.isPending || importBackup.isPending;

  return (
    <Sheet
      id="BackupSheet"
      titleKey="title.backup"
      contentContainerClassName="gap-4"
    >
      <TStyledText
        preset="dimOnCanvas"
        textKey="settings.description.backup"
        className="text-center text-sm"
      />

      <View className="mt-2 flex-row gap-2">
        <Button
          onPress={() => mutateGuard(exportBackup, undefined)}
          disabled={inProgress}
          className="flex-1"
        >
          <TStyledText
            textKey="settings.related.export"
            bold
            className="text-center text-sm"
          />
        </Button>
        <Button
          onPress={() => mutateGuard(importBackup, undefined)}
          disabled={inProgress}
          className="flex-1"
        >
          <TStyledText
            textKey="settings.related.import"
            bold
            className="text-center text-sm"
          />
        </Button>
      </View>
    </Sheet>
  );
}
