import { setFocusedInput } from "@/global/states/view.slice";
import { borderLC } from "@/global/styles/app.css";
import {
  getComboboxStyles,
  getComboboxTextInputForPagination,
} from "@/global/styles/global.styles";
import {
  Combobox,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useCombobox,
  useMantineColorScheme,
} from "@mantine/core";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const CustomNumberCombobox = ({
  data,
  value,
  handleValue,
  id,
  totalPages,
}: any) => {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { colorScheme } = useMantineColorScheme();
  const { dropdownBg } = getComboboxStyles(colorScheme);

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = data.map((item: any) => (
    <Combobox.Option value={item} key={item} p="xs">
      <Text tt="capitalize" ta="center">
        {item}
      </Text>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value) => {
        handleValue(value);
        combobox.closeDropdown();
      }}>
      <Combobox.Target>
        <TextInput
          ref={ref}
          id={id}
          w={60}
          value={value}
          readOnly
          styles={getComboboxTextInputForPagination()}
          onClick={() => combobox.openDropdown()}
          wrapperProps={{
            onFocus: () => handleFocus(id),
            onBlur: handleBlur,
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown miw={60} className={borderLC} p={3} bg={dropdownBg}>
        <Combobox.Options>
          <ScrollArea
            h={totalPages === 1 ? 45 : totalPages === 2 ? 90 : 110}
            scrollbarSize={2}
            p={0}>
            <Stack gap={3}>{options}</Stack>
          </ScrollArea>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
