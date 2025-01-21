import { RootState } from "@/global/states/store";
import { setFocusedInput } from "@/global/states/view.slice";
import { border } from "@/global/styles/app.css";
import {
  getComboboxTextInput,
  getComboboxStyles,
} from "@/global/styles/global.styles";
import { globalUtility } from "@/global/utilities";
import {
  Combobox,
  useCombobox,
  Text,
  Stack,
  useMantineColorScheme,
  TextInput,
} from "@mantine/core";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Used for Sort & Order filters, and playlist Access field
// Sets Enum Value as value and Key as Display Label
export const CustomEnumCombobox = ({
  EnumObject,
  data,
  value,
  handleValue,
  id,
  shouldCapitalize = true,
}: any) => {
  const ref = useRef<any>(null);
  const dispatch = useDispatch();
  const { focusedInput } = useSelector((state: RootState) => state.view);
  const { colorScheme } = useMantineColorScheme();
  const { dropdownBg } = getComboboxStyles(colorScheme);

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = data.map((item: any) => (
    <Combobox.Option value={item} key={item} p="xs">
      {shouldCapitalize ? (
        <Text tt="capitalize" ta="center">
          {globalUtility.getKeyByValue(EnumObject, item)}
        </Text>
      ) : (
        <Text ta="center">{globalUtility.getKeyByValue(EnumObject, item)}</Text>
      )}
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
          miw="100%"
          value={value}
          readOnly
          styles={getComboboxTextInput(focusedInput === id)}
          wrapperProps={{
            onFocus: () => handleFocus(id),
            onBlur: handleBlur,
          }}
          radius="md"
          onClick={() => combobox.openDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown miw={120} className={border} p={3} bg={dropdownBg}>
        <Combobox.Options>
          <Stack gap={3}>{options}</Stack>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
