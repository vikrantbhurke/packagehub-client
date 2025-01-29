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
  useMantineColorScheme,
  TextInput,
} from "@mantine/core";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Used for Sort & Order or similar filters
// Sets Enum Value as Value and Key as Display Label
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
          styles={getComboboxTextInputStyles(focusedInput === id)}
          onClick={() => combobox.openDropdown()}
          wrapperProps={{
            onFocus: () => handleFocus(id),
            onBlur: handleBlur,
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown
        miw={120}
        className={`${noBorderStyle} ${borderShadowStyle}`}
        p={3}
        bg={dropdownBg}>
        <Combobox.Options>
          <Stack gap={3}>{options}</Stack>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
