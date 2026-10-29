import { IconButton, Menu, Portal } from '@chakra-ui/react'
import { LuLayoutPanelLeft, LuPanelTop, LuPanelsRightBottom } from 'react-icons/lu'
import { useUiStore, type LayoutMode } from '@/stores/ui'

export function LayoutSwitcher() {
  const { layout, setLayout } = useUiStore()
  return (
    <Menu.Root positioning={{ placement: 'bottom-start' }}>
      <Menu.Trigger asChild>
        <IconButton variant="ghost" size="sm" aria-label="چیدمان" hideBelow="lg">
          <LuPanelsRightBottom />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.RadioItemGroup value={layout} onValueChange={(e) => setLayout(e.value as LayoutMode)}>
              <Menu.ItemGroupLabel>چیدمان</Menu.ItemGroupLabel>
              <Menu.RadioItem value="sidebar">
                <LuLayoutPanelLeft /> منوی کناری
                <Menu.ItemIndicator />
              </Menu.RadioItem>
              <Menu.RadioItem value="topnav">
                <LuPanelTop /> منوی بالا
                <Menu.ItemIndicator />
              </Menu.RadioItem>
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
