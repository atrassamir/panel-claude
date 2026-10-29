import { Button, Dialog, Portal, Text } from '@chakra-ui/react'

type Props = {
  open: boolean
  title: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({ open, title, description, confirmLabel = 'حذف', onConfirm, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} role="alertdialog" size="sm">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            {description && (
              <Dialog.Body>
                <Text color="fg.muted">{description}</Text>
              </Dialog.Body>
            )}
            <Dialog.Footer>
              <Button variant="outline" onClick={onClose}>
                انصراف
              </Button>
              <Button
                colorPalette="red"
                onClick={() => {
                  onConfirm()
                  onClose()
                }}
              >
                {confirmLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
