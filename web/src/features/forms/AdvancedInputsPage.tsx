import { useState } from 'react'
import {
  Box,
  CheckboxCard,
  CheckboxGroup,
  ColorPicker,
  Combobox,
  createListCollection,
  DatePicker,
  Editable,
  FileUpload,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  NumberInput,
  parseColor,
  PinInput,
  Portal,
  RadioCard,
  RatingGroup,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Switch,
  TagsInput,
  Text,
  Textarea,
  useFilter,
  useListCollection,
} from '@chakra-ui/react'
import { LuCalendar, LuCloudUpload, LuCreditCard, LuLock, LuMail, LuPencil, LuTruck, LuWallet, LuX, LuCheck } from 'react-icons/lu'
import { FormField } from '@/components/FormField'
import { PageHeader } from '@/components/PageHeader'
import { DemoRow, DemoSection } from '@/components/Showcase'

const cities = createListCollection({
  items: ['تهران', 'اصفهان', 'شیراز', 'مشهد', 'تبریز', 'رشت', 'یزد', 'کرمان'].map((c) => ({ label: c, value: c })),
})

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Next.js', 'Nuxt', 'Remix', 'Astro'].map((f) => ({ label: f, value: f }))

function FrameworkCombobox() {
  const { contains } = useFilter({ sensitivity: 'base' })
  const { collection, filter } = useListCollection({ initialItems: frameworks, filter: contains })
  return (
    <Combobox.Root collection={collection} onInputValueChange={(e) => filter(e.inputValue)} openOnClick>
      <Combobox.Label>فریم‌ورک (قابل جستجو)</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="بنویسید…" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>موردی پیدا نشد</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

function CitySelect({ multiple }: { multiple?: boolean }) {
  return (
    <Select.Root collection={cities} multiple={multiple} defaultValue={multiple ? ['تهران', 'شیراز'] : undefined}>
      <Select.HiddenSelect />
      <Select.Label>{multiple ? 'چند شهر' : 'شهر'}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="انتخاب کنید" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {cities.items.map((c) => (
              <Select.Item item={c} key={c.value}>
                {c.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

function DateField() {
  return (
    <DatePicker.Root>
      <DatePicker.Label>تاریخ</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.DayTable />
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Header />
              <DatePicker.MonthTable />
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Header />
              <DatePicker.YearTable />
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

function ColorField() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#3b82f6')} maxW="xs">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>رنگ برند</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
            <ColorPicker.SwatchGroup>
              {['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6', '#3b82f6', '#8b5cf6', '#ec4899'].map((c) => (
                <ColorPicker.SwatchTrigger key={c} value={c}>
                  <ColorPicker.Swatch value={c} />
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}

export function AdvancedInputsPage() {
  const [range, setRange] = useState([20, 70])
  const [volume, setVolume] = useState([40])

  return (
    <>
      <PageHeader title="فیلدهای پیشرفته" description="Select، Combobox، تاریخ، رنگ، آپلود فایل، اسلایدر، امتیاز و موارد دیگر" />
      <Stack gap="6">
        <DemoSection title="ورودی متن">
          <DemoRow label="انواع">
            {(['outline', 'subtle', 'flushed'] as const).map((v) => (
              <Input key={v} variant={v} placeholder={v} maxW="56" />
            ))}
          </DemoRow>
          <DemoRow label="اندازه‌ها">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
              <Input key={s} size={s} placeholder={`اندازه ${s}`} maxW="44" />
            ))}
          </DemoRow>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            <FormField label="با آیکون">
              <InputGroup startElement={<LuMail />}>
                <Input dir="ltr" placeholder="email@example.com" />
              </InputGroup>
            </FormField>
            <FormField label="با پیشوند و پسوند">
              <InputGroup startAddon="https://" endAddon=".com" dir="ltr">
                <Input placeholder="yoursite" />
              </InputGroup>
            </FormField>
            <FormField label="مبلغ">
              <InputGroup endAddon="تومان">
                <Input placeholder="۰" />
              </InputGroup>
            </FormField>
            <FormField label="غیرفعال">
              <Input disabled value="قابل ویرایش نیست" />
            </FormField>
            <FormField label="نامعتبر" error="این مقدار معتبر نیست">
              <Input defaultValue="abc" />
            </FormField>
            <FormField label="متن چندخطی با اندازه‌ی خودکار">
              <Textarea autoresize placeholder="تایپ کنید…" />
            </FormField>
          </SimpleGrid>
        </DemoSection>

        <DemoSection title="انتخاب از فهرست">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            <CitySelect />
            <CitySelect multiple />
            <FrameworkCombobox />
          </SimpleGrid>
          <FormField label="تگ‌ها">
            <TagsInput.Root defaultValue={['طراحی', 'React']}>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="بنویسید و Enter بزنید" />
              </TagsInput.Control>
            </TagsInput.Root>
          </FormField>
        </DemoSection>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="تاریخ و رنگ">
            <DateField />
            <ColorField />
          </DemoSection>
          <DemoSection title="عدد و کد">
            <FormField label="تعداد">
              <NumberInput.Root defaultValue="3" min={0} max={20} maxW="40">
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </FormField>
            <Stack gap="2">
              <Text fontSize="sm" fontWeight="medium">
                کد تأیید
              </Text>
              <PinInput.Root otp dir="ltr">
                <PinInput.HiddenInput />
                <PinInput.Control>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <PinInput.Input key={i} index={i} />
                  ))}
                </PinInput.Control>
              </PinInput.Root>
            </Stack>
            <Stack gap="2">
              <Text fontSize="sm" fontWeight="medium">
                ویرایش درجا (روی متن کلیک کنید)
              </Text>
              <Editable.Root defaultValue="عنوان پروژه" activationMode="click">
                <Editable.Preview />
                <Editable.Input />
                <Editable.Control>
                  <Editable.EditTrigger asChild>
                    <IconButton variant="ghost" size="xs" aria-label="ویرایش">
                      <LuPencil />
                    </IconButton>
                  </Editable.EditTrigger>
                  <Editable.CancelTrigger asChild>
                    <IconButton variant="outline" size="xs" aria-label="انصراف">
                      <LuX />
                    </IconButton>
                  </Editable.CancelTrigger>
                  <Editable.SubmitTrigger asChild>
                    <IconButton variant="outline" size="xs" aria-label="ثبت">
                      <LuCheck />
                    </IconButton>
                  </Editable.SubmitTrigger>
                </Editable.Control>
              </Editable.Root>
            </Stack>
          </DemoSection>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
          <DemoSection title="اسلایدر">
            <Slider.Root value={volume} onValueChange={(e) => setVolume(e.value)} colorPalette="blue">
              <HStack justify="space-between">
                <Slider.Label>صدا</Slider.Label>
                <Slider.ValueText />
              </HStack>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
            <Slider.Root value={range} onValueChange={(e) => setRange(e.value)} colorPalette="purple" minStepsBetweenThumbs={5}>
              <HStack justify="space-between">
                <Slider.Label>بازه‌ی قیمت (میلیون)</Slider.Label>
                <Text fontSize="sm">
                  {range[0]} تا {range[1]}
                </Text>
              </HStack>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
              </Slider.Control>
            </Slider.Root>
            <Slider.Root defaultValue={[50]} step={25} colorPalette="teal">
              <Slider.Label>با نشانه</Slider.Label>
              <Slider.Control>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
                <Slider.Marks marks={[0, 25, 50, 75, 100]} />
              </Slider.Control>
            </Slider.Root>
          </DemoSection>

          <DemoSection title="امتیاز و سوییچ">
            <DemoRow label="امتیاز">
              <RatingGroup.Root count={5} defaultValue={4} colorPalette="yellow" size="lg">
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <RatingGroup.Root count={5} defaultValue={3.5} allowHalf colorPalette="orange" readOnly>
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </DemoRow>
            <DemoRow label="سوییچ در اندازه‌ها و رنگ‌ها">
              {(['xs', 'sm', 'md', 'lg'] as const).map((s, i) => (
                <Switch.Root key={s} size={s} defaultChecked colorPalette={['blue', 'green', 'purple', 'orange'][i]}>
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label>{s}</Switch.Label>
                </Switch.Root>
              ))}
            </DemoRow>
          </DemoSection>
        </SimpleGrid>

        <DemoSection title="کارت انتخاب">
          <Text fontSize="sm" fontWeight="medium">
            روش ارسال (یک گزینه)
          </Text>
          <RadioCard.Root defaultValue="express" colorPalette="blue">
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="3">
              {[
                { v: 'standard', t: 'پست عادی', d: '۳ تا ۵ روز کاری', icon: <LuTruck /> },
                { v: 'express', t: 'پست پیشتاز', d: '۱ تا ۲ روز کاری', icon: <LuTruck /> },
                { v: 'pickup', t: 'تحویل حضوری', d: 'همان روز', icon: <LuWallet /> },
              ].map((o) => (
                <RadioCard.Item key={o.v} value={o.v}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <Icon fontSize="xl" color="fg.muted">
                      {o.icon}
                    </Icon>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText>{o.t}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>{o.d}</RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </SimpleGrid>
          </RadioCard.Root>
          <Text fontSize="sm" fontWeight="medium">
            امکانات (چند گزینه)
          </Text>
          <CheckboxGroup defaultValue={['backup']}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="3">
              {[
                { v: 'backup', t: 'پشتیبان‌گیری روزانه', icon: <LuCloudUpload /> },
                { v: 'ssl', t: 'گواهی SSL', icon: <LuLock /> },
                { v: 'pay', t: 'درگاه پرداخت', icon: <LuCreditCard /> },
              ].map((o) => (
                <CheckboxCard.Root key={o.v} value={o.v} colorPalette="green">
                  <CheckboxCard.HiddenInput />
                  <CheckboxCard.Control>
                    <Icon fontSize="xl" color="fg.muted">
                      {o.icon}
                    </Icon>
                    <CheckboxCard.Label>{o.t}</CheckboxCard.Label>
                    <CheckboxCard.Indicator />
                  </CheckboxCard.Control>
                </CheckboxCard.Root>
              ))}
            </SimpleGrid>
          </CheckboxGroup>
        </DemoSection>

        <DemoSection title="آپلود فایل">
          <FileUpload.Root maxFiles={5} alignItems="stretch" accept="image/*">
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="lg" color="fg.muted">
                <LuCloudUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>فایل‌ها را اینجا بکشید یا کلیک کنید</Box>
                <Box color="fg.muted">PNG یا JPG، حداکثر ۵ فایل</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List showSize clearable />
          </FileUpload.Root>
        </DemoSection>
      </Stack>
    </>
  )
}
