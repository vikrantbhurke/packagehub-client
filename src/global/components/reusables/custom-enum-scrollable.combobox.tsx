import { RootState } from "@/global/states/store";
import { setFocusedInput } from "@/global/states/view.slice";
import {
  borderShadowStyle,
  noBorderStyle,
  oneTxGreenBgMenuButtonPseudoStyle,
} from "@/global/styles/app.css";
import {
  getComboboxTextInputStyles,
  getDropdownStyles,
} from "@/global/styles/global.styles";
import { globalUtility } from "@/global/utilities";
import {
  Combobox,
  useCombobox,
  Text,
  Stack,
  ScrollArea,
  useMantineColorScheme,
  TextInput,
} from "@mantine/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Use for Alphabets, Long Lists filter field
// Sets Enum Value as Value and Key as Display Label
export const CustomEnumScrollableCombobox = ({
  EnumObject,
  data,
  value,
  handleValue,
  id,
}: any) => {
  const dispatch = useDispatch();
  const { focusedInput } = useSelector((state: RootState) => state.view);
  const { colorScheme } = useMantineColorScheme();
  const { dropdownBg } = getDropdownStyles(colorScheme);

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = data.map((item: any) => (
    <Combobox.Option
      p="xs"
      key={item}
      value={item}
      className={oneTxGreenBgMenuButtonPseudoStyle}>
      <Text tt="capitalize" ta="center">
        {globalUtility.getKeyByValue(EnumObject, item)}
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
          id={id}
          miw="100%"
          value={value}
          readOnly
          styles={getComboboxTextInputStyles(focusedInput === id)}
          wrapperProps={{
            onFocus: () => handleFocus(id),
            onBlur: handleBlur,
          }}
          onClick={() => combobox.openDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        miw={120}
        className={`${noBorderStyle} ${borderShadowStyle}`}
        p={3}
        bg={dropdownBg}>
        <Combobox.Options>
          <ScrollArea h={200} scrollbarSize={2}>
            <Stack gap={3}>{options}</Stack>
          </ScrollArea>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
