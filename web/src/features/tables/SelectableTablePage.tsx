import { useState } from 'react'
import {
  ActionBar,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  HStack,
  IconButton,
  Menu,
  Portal,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import { LuEllipsisVertical, LuPencil, LuPlus, LuTrash2, LuUserCheck, LuUserX } from 'react-icons/lu'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { PageHeader } from '@/components/PageHeader'
import { TablePagination } from '@/components/table/TablePagination'
import { toaster } from '@/components/ui/toaster-store'
import { roleLabels, sampleUsers, statusMeta, type User, type UserStatus } from '@/data/users'
import { formatDate, formatNumber } from '@/lib/format'
import { UserDialog, type UserFormValues } from './UserDialog'

const PAGE_SIZE = 8

export function SelectableTablePage() {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [selected, setSelected] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<{ open: boolean; user: User | null }>({ open: false, user: null })
  const [pendingDelete, setPendingDelete] = useState<number[] | null>(null)

  const pageRows = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageIds = pageRows.map((u) => u.id)
  const selectedOnPage = pageIds.filter((id) => selected.includes(id)).length
  const headerChecked = selectedOnPage === 0 ? false : selectedOnPage === pageIds.length ? true : 'indeterminate'

  const toggleRow = (id: number, checked: boolean) =>
    setSelected((s) => (checked ? [...s, id] : s.filter((x) => x !== id)))

  const togglePage = (checked: boolean) =>
    setSelected((s) => (checked ? [...new Set([...s, ...pageIds])] : s.filter((id) => !pageIds.includes(id))))

  const setStatus = (ids: number[], status: UserStatus) => {
    setUsers((list) => list.map((u) => (ids.includes(u.id) ? { ...u, status } : u)))
    toaster.create({ type: 'success', title: `وضعیت ${formatNumber(ids.length)} کاربر تغییر کرد` })
  }

  const deleteUsers = (ids: number[]) => {
    const remaining = users.filter((u) => !ids.includes(u.id))
    setUsers(remaining)
    setSelected((s) => s.filter((id) => !ids.includes(id)))
    // Stay on a page that still exists.
    setPage((p) => Math.min(p, Math.max(1, Math.ceil(remaining.length / PAGE_SIZE))))
    toaster.create({ type: 'success', title: `${formatNumber(ids.length)} کاربر حذف شد` })
  }

  const saveUser = (values: UserFormValues) => {
    const current = editing.user
    if (current) {
      setUsers((list) => list.map((u) => (u.id === current.id ? { ...u, ...values } : u)))
      toaster.create({ type: 'success', title: 'کاربر ویرایش شد' })
    } else {
      const id = Math.max(0, ...users.map((u) => u.id)) + 1
      setUsers((list) => [{ ...values, id, createdAt: new Date().toISOString() }, ...list])
      setPage(1)
      toaster.create({ type: 'success', title: 'کاربر اضافه شد' })
    }
    setEditing({ open: false, user: null })
  }

  return (
    <>
      <PageHeader
        title="جدول قابل انتخاب"
        description="انتخاب چندتایی، عملیات گروهی و ویرایش در پنجره"
        actions={
          <Button colorPalette="blue" onClick={() => setEditing({ open: true, user: null })}>
            <LuPlus /> کاربر جدید
          </Button>
        }
      />

      <Card.Root>
        <Card.Body>
          <Table.ScrollArea>
            <Table.Root interactive>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w="6">
                    <Checkbox.Root
                      size="sm"
                      aria-label="انتخاب همه"
                      checked={headerChecked}
                      onCheckedChange={(e) => togglePage(!!e.checked)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>کاربر</Table.ColumnHeader>
                  <Table.ColumnHeader>نقش</Table.ColumnHeader>
                  <Table.ColumnHeader>وضعیت</Table.ColumnHeader>
                  <Table.ColumnHeader>تاریخ عضویت</Table.ColumnHeader>
                  <Table.ColumnHeader w="12" />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pageRows.map((user) => {
                  const isSelected = selected.includes(user.id)
                  return (
                    <Table.Row key={user.id} data-selected={isSelected ? '' : undefined}>
                      <Table.Cell>
                        <Checkbox.Root
                          size="sm"
                          aria-label={`انتخاب ${user.name}`}
                          checked={isSelected}
                          onCheckedChange={(e) => toggleRow(user.id, !!e.checked)}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                        </Checkbox.Root>
                      </Table.Cell>
                      <Table.Cell>
                        <HStack gap="3">
                          <Avatar.Root size="sm">
                            <Avatar.Fallback name={user.name} />
                          </Avatar.Root>
                          <Stack gap="0">
                            <Text fontWeight="medium">{user.name}</Text>
                            <Text fontSize="xs" color="fg.muted">
                              {user.email}
                            </Text>
                          </Stack>
                        </HStack>
                      </Table.Cell>
                      <Table.Cell>{roleLabels[user.role]}</Table.Cell>
                      <Table.Cell>
                        <Badge colorPalette={statusMeta[user.status].color}>{statusMeta[user.status].label}</Badge>
                      </Table.Cell>
                      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                      <Table.Cell>
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <IconButton variant="ghost" size="sm" aria-label="عملیات">
                              <LuEllipsisVertical />
                            </IconButton>
                          </Menu.Trigger>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content>
                                <Menu.Item value="edit" onSelect={() => setEditing({ open: true, user })}>
                                  <LuPencil /> ویرایش
                                </Menu.Item>
                                <Menu.Item value="activate" onSelect={() => setStatus([user.id], 'active')}>
                                  <LuUserCheck /> فعال‌سازی
                                </Menu.Item>
                                <Menu.Item value="deactivate" onSelect={() => setStatus([user.id], 'inactive')}>
                                  <LuUserX /> غیرفعال‌سازی
                                </Menu.Item>
                                <Menu.Separator />
                                <Menu.Item value="delete" color="fg.error" onSelect={() => setPendingDelete([user.id])}>
                                  <LuTrash2 /> حذف
                                </Menu.Item>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>
          <TablePagination total={users.length} page={page} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </Card.Body>
      </Card.Root>

      <ActionBar.Root open={selected.length > 0}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>{formatNumber(selected.length)} مورد انتخاب شده</ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm" onClick={() => setStatus(selected, 'active')}>
                <LuUserCheck /> فعال‌سازی
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStatus(selected, 'inactive')}>
                <LuUserX /> غیرفعال‌سازی
              </Button>
              <Button variant="outline" size="sm" colorPalette="red" onClick={() => setPendingDelete(selected)}>
                <LuTrash2 /> حذف
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                لغو انتخاب
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>

      <UserDialog
        open={editing.open}
        user={editing.user}
        onClose={() => setEditing({ open: false, user: null })}
        onSave={saveUser}
      />
      <ConfirmDialog
        open={pendingDelete !== null}
        title={`حذف ${formatNumber(pendingDelete?.length ?? 0)} کاربر؟`}
        description="این عملیات قابل بازگشت نیست."
        onConfirm={() => pendingDelete && deleteUsers(pendingDelete)}
        onClose={() => setPendingDelete(null)}
      />
    </>
  )
}
