import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

export type INeedSavePopupProps = {
  show: boolean
  onReset?: () => void
  onSave?: () => void
  text?: string
  isSubmitting?: boolean
}

export default function NeedSavePopup({
  show,
  onReset,
  onSave,
  text = "Be careful, there are still unsaved changes!",
  isSubmitting,
}: INeedSavePopupProps) {
  return (
    <div className={"absolute bottom-0 z-50 mx-0 overflow-hidden pb-4"}>
      <div
        className={cn(
          "flex w-max flex-row items-center justify-center space-x-4 rounded border border-card-foreground/40 bg-card px-4 py-2 transition-all duration-300",
          show ? "animate-[bounce-up_1s_ease-out] opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <p className="text-sm text-gray-500">{text}</p>
        <div className="flex flex-row gap-2">
          <Button variant="link" onClick={onReset} className="px-2" type="button">
            Reset
          </Button>
          <Button onClick={onSave} isLoading={isSubmitting}>
            Save changes
          </Button>
        </div>
      </div>
    </div>
  )
}
